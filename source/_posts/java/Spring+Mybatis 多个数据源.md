---
title: Spring+Mybatis 多个数据源
date: 2017-06-9 16:31:34
categories:
- java
tags:
- Spring
- Mybatis
---
# Spring+Mybatis 多个数据源
一般我们都会一个项目只用一个 `DB`，但是也有特殊情况，可能会使用到多个 `DB`。下面是 `Spring MVC + Mybatis` 下的多数据源配置。

## 配置
### 继承AbstractRoutingDataSource
`AbstractRoutingDataSource` 是spring提供的一个多数据源抽象类。spring会在使用事务的地方来调用此类的 `determineCurrentLookupKey()` 方法来获取数据源的key值。我们继承此抽象类并实现此方法：
<!-- more -->

```java
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
/**
* 实现spring多路由配置
*/
public class MultipleDataSource extends AbstractRoutingDataSource {
   @Override
   public Logger getParentLogger() {
       return null;
   }
    @Override
   protected Object determineCurrentLookupKey() {
       return DataSourceContextHolder.getDataSource();
   }

}
```

### 创建数据库切换类
`MultipleDataSource` 类中通过 `DataSourceContextHolder.getDataSource()` 获取数据源的key值。此方法应该和线程绑定。

```java
/**
 * 数据库切换工具类
 */
public class DataSourceContextHolder {
    // 数据源名称线程池
    private static final ThreadLocal<String> contextHolder = new ThreadLocal<String>();
    /**
     * 设置数据源
     * @param datasource 数据源名称
     */
    public static void setDataSource(String datasource) {
     contextHolder.set(datasource);
    }
    /**
     * 获取数据源
     * @return 数据源名称
     */
    public static String getDataSource() {
     return contextHolder.get();
    }
    /**
     * 清空数据源
     */
    public static void clearDataSource() {
     contextHolder.remove();
    }
}
```

### 创建数据库常量类

```java
public class DataSourceType {
    public static final String DB1 = "dataSource1"; //数据源1
    public static final String DB2 = "dataSource2"; //数据源2
}
```

### 配置数据库属性文件 dbcp.properties

```tex
initialSize=20
maxActive=200
maxIdle=20
minIdle=1
maxWait=20000

data1.driver=com.mysql.jdbc.Driver
data1.url=jdbc:mysql://localhsot:3306/test
data1.username=admin
data1.password=123456

data2.driver=com.mysql.jdbc.Driver
data2.url=jdbc:mysql://localhsot:3307/test
data2.username=admin
data2.password=123456
```

### Spring配置文件
重点 `multipleDataSource`，事务采用拦截器方式，并支持 `@Transcational` 注解方式

```xml
<!-- 数据源1：dataSource1-->
<bean id="dataSource1" class="org.apache.commons.dbcp.BasicDataSource"
     destroy-method="close">
   <property name="driverClassName" value="${data1.driver}" />
   <property name="url" value="${data1.url}" />
   <property name="username" value="${data1.username}" />
   <property name="password" value="${data1.password}" />
   <!-- 初始化连接大小 -->
   <property name="initialSize" value="${initialSize}"></property>
   <!-- 连接池最大数量 -->
   <property name="maxActive" value="${maxActive}"></property>
   <!-- 连接池最大空闲 -->
   <property name="maxIdle" value="${maxIdle}"></property>
   <!-- 连接池最小空闲 -->
   <property name="minIdle" value="${minIdle}"></property>
   <!-- 获取连接最大等待时间 -->
   <property name="maxWait" value="${maxWait}"></property>
</bean>
<!-- 数据源2：dataSource2-->
<bean id="dataSource2" class="org.apache.commons.dbcp.BasicDataSource"
     destroy-method="close">
   <property name="driverClassName" value="${data2.driver}" />
   <property name="url" value="${data2.url}" />
   <property name="username" value="${data2.username}" />
   <property name="password" value="${data2.password}" />
   <!-- 初始化连接大小 -->
   <property name="initialSize" value="${initialSize}"></property>
   <!-- 连接池最大数量 -->
   <property name="maxActive" value="${maxActive}"></property>
   <!-- 连接池最大空闲 -->
   <property name="maxIdle" value="${maxIdle}"></property>
   <!-- 连接池最小空闲 -->
   <property name="minIdle" value="${minIdle}"></property>
   <!-- 获取连接最大等待时间 -->
   <property name="maxWait" value="${maxWait}"></property>
</bean>
<!-- 多数据源bean创建 -->
<bean id="multipleDataSource" class="com.utils.MultipleDataSource">
   <description>多数据源路由</description>
   <property name="targetDataSources">
       <map key-type="java.lang.String">
           <!-- 指定lookupKey和与之对应的数据源 -->
           <entry key="dataSource1" value-ref="dataSource1"></entry>
           <entry key="dataSource2" value-ref="dataSource2"></entry>
       </map>
   </property>
   <!-- 这里可以指定默认的数据源 -->
   <property name="defaultTargetDataSource" ref="dataSource1" />
</bean>


<!-- 自动扫描mapping.xml文件 -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
   <property name="dataSource" ref="multipleDataSource" />
   <property name="mapperLocations" value="classpath:com/mapper/*.xml"></property>
</bean>

<!-- DAO接口所在包名，Spring会自动查找其下的类 -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
   <!--basePackage指定要扫描的包，在此包之下的映射器都会被搜索到。 可指定多个包，包与包之间用逗号或分号分隔 -->
   <property name="basePackage" value="com.mapper" />
   <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"></property>
</bean>


<!-- 事务管理 -->
<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
   <property name="dataSource" ref="multipleDataSource" />
</bean>

<!--声明式事务配置-->
<tx:annotation-driven transaction-manager="txManager" />
<!--需要扫描的包-->
<context:component-scan base-package="com" />
```

### 调用示例

```
@Autowired
TestMapper testMapper;
public List<Test> queryTest(String id) throws Exception {
   DataSourceContextHolder.setDataSource(DataSourceType.DB1); //设置数据源
   return testMapper.queryInvestorsById(id);
   DataSourceContextHolder.clearDataSource(); //查询完清除DB类型
}
```

## 自定义注解
### 自定义数据源注解类

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 数据源注解类
 */
@Target({ ElementType.TYPE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
public @interface DataSource {
    String value();
}
```

### 定义一个数据源切面类
指定注解以后，我们可以通过AOP拦截所有service方法，在方法执行之前获取方法上的注解：即数据源的key值。

```java
import java.lang.reflect.Method;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
@Aspect
@Component
@Order(1) //请注意：这里order一定要小于tx:annotation-driven的order，即先执行DataSourceAspect切面，再执行事务切面，才能获取到最终的数据源
public class DataSourceAspect {
    /**
     * 切入点 service包及子孙包下的所有类
     */
    	@Pointcut("execution(* com.service.*.*(..))")  
    	public void aspect() {
     } 
	
     @Before("aspect()")
     public void before(JoinPoint point) {
        Class<?> target = point.getTarget().getClass();
        MethodSignature signature = (MethodSignature) point.getSignature();
        Method method = signature.getMethod() ;
        DataSource dataSource = null ;
        //从类初始化
        dataSource = this.getDataSource(target, method) ;
        //从接口初始化
        if(dataSource == null){
            for (Class<?> clazz : target.getInterfaces()) {
                dataSource = getDataSource(clazz, method);
                if(dataSource != null){
                    break ;//从某个接口中一旦发现注解，不再循环
                }
            }
        }

        if(dataSource != null && !StringUtils.isEmpty(dataSource.value()) ){
            DataSourceContextHolder.setDataSource(dataSource.value());
        }
    }

    @After("aspect()")
    public void after(JoinPoint point) {
        //使用完记得清空
        DataSourceContextHolder.clearDataSource();
    }

    /**
     * 获取方法或类的注解对象DataSource
     * @param target      类class
     * @param method    方法
     * @return DataSource
     */
    public DataSource getDataSource(Class<?> target, Method method){
        try {
            //优先方法注解
            Class<?>[] types = method.getParameterTypes();
            Method m = target.getMethod(method.getName(), types);
            if (m != null && m.isAnnotationPresent(DataSource.class)) {
                return m.getAnnotation(DataSource.class);
            }
            //其次类注解
            if (target.isAnnotationPresent(DataSource.class)) {
                return target.getAnnotation(DataSource.class);
            }

        } catch (Exception e) {
            e.printStackTrace();
            logger.error(MessageFormat.format("通过注解切换数据源时发生异常[class={0},method={1}]："
                    , target.getName(), method.getName()),e)  ;
        }
        return null ;
    }
}
```

### AOP顺序
由于我使用的注解式事务，和我们的AOP数据源切面有一个顺序的关系。数据源切换必须先执行，数据库事务才能获取到正确的数据源。所以要明确指定 注解式事务和 我们AOP数据源切面的先后顺序。

我们数据源切换的AOP是通过注解来实现的，只需要在AOP类上加上一个 `order(1)` 注解即可，其中1代表顺序号。

注解式事务的是通过xml配置启动

```
<tx:annotation-driven transaction-manager="transactionManager" order="2" />
```
### 示例Demo
在每个service方法前使用 `@DataSource("数据源key")` 注解即可。

```java
@Autowired
TestMapper testMapper;

@DataSource(DataSourceType.DB1)
@Transactional(readOnly = true, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public List<Test> queryTest(String id) {
    return testMapper.queryInvestorsById(id);
}
```

## 参考链接 
[Spring MVC+Mybatis 多数据源配置](http://www.jianshu.com/p/fddcc1a6b2d8)
[Spring+Mybatis 多个数据源配置](https://blog.liyang.io/480.html)



