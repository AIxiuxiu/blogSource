---
title: Mybatis
date: 2017-07-02 17:12:30
categories:
- java
tags:
- Mybatis
---

# Mybatis
## Mapper XML
### select
查询语句是 `MyBatis` 中最常用的元素之一，每个插入、更新或删除操作，通常对应多个查询操作。这是 `MyBatis` 的基本原则之一，也是将焦点和努力放到查询和结果映射的原因。简单查询的 `select` 查询是非常简单的。比如：

```xml
<select id="selectPerson" parameterType="int" resultType="hashmap">
  SELECT * FROM PERSON WHERE ID = #{id}
</select>
```
<!-- more -->
这个语句被称作 `selectPerson`，接受一个 `int`（或 `Integer`）类型的参数，并返回一个 `HashMap` 类型的对象，其中的键是列名，值便是结果行中的对应值。

注意参数符号： **#{id}**

这就告诉 `MyBatis` 创建一个预处理语句参数，通过 `JDBC`，这样的一个参数在 `SQL` 中会由一个“?”来标识，并被传递到一个新的预处理语句中，就像这样：

```java
// Similar JDBC code, NOT MyBatis…
String selectPerson = "SELECT * FROM PERSON WHERE ID=?";
PreparedStatement ps = conn.prepareStatement(selectPerson);
ps.setInt(1,id);
```

`select` 元素有很多属性允许你配置，来决定每条语句的作用细节。

```xml
<select
  id="selectPerson"
  parameterType="int"
  parameterMap="deprecated"
  resultType="hashmap"
  resultMap="personResultMap"
  flushCache="false"
  useCache="true"
  timeout="10000"
  fetchSize="256"
  statementType="PREPARED"
  resultSetType="FORWARD_ONLY">
```

具体查看[属性列表](#property)

### insert
下面就是 `insert` 语句的示例

```xml
<insert id="insertAuthor">
  insert into Author (id,username,password,email)
  values (#{id},#{username},#{password},#{email})
</insert>
```

insert 元素有很多属性,具体查看[属性列表](#property)

```xml
<insert
  id="insertAuthor"
  parameterType="domain.blog.Author"
  flushCache="true"
  statementType="PREPARED"
  keyProperty=""
  keyColumn=""
  useGeneratedKeys=""
  timeout="20">
```

如果你的数据库支持自动生成主键的字段（比如 `MySQL` 和 `SQL Server`），那么你可以设置 `useGeneratedKeys=”true”` ，然后再把 `keyProperty` 设置到目标属性上就OK了。例如，如果上面的 Author 表已经对 id 使用了自动生成的列类型，那么语句可以修改为:

```xml
<insert id="insertAuthor" useGeneratedKeys="true"
    keyProperty="id">
  insert into Author (username,password,email)
  values (#{username},#{password},#{email})
</insert>
```

如果你的数据库还支持多行插入, 你也可以传入一个 `Authors` 数组或集合，并返回自动生成的主键。

```xml
<insert id="insertAuthor" useGeneratedKeys="true"
    keyProperty="id">
  insert into Author (username, password, email) values
  <foreach item="item" collection="list" separator=",">
    (#{item.username}, #{item.password}, #{item.email})
  </foreach>
</insert>
```

对于不支持自动生成类型的数据库或可能不支持自动生成主键 `JDBC` 驱动来说，`MyBatis` 可以使用 `Oracle` 序列生成主键。

```xml
<insert id="insertAuthor">
  <selectKey keyProperty="id" resultType="int" order="BEFORE">
    select STOCKIDSEQUENCE.NEXTVAL as id from DUAL
  </selectKey>
  insert into Author
    (id, username, password, email)
  values
    (#{id}, #{username}, #{password}, #{email})
</insert>
```

### update
下面就是 `update` 语句的示例

```xml
<update id="updateAuthor">
  update Author set
    username = #{username},
    password = #{password},
    email = #{email},
  where id = #{id}
</update>
```

`update` 元素的属性,[属性列表](#property)

```xml
<update
  id="updateAuthor"
  parameterType="domain.blog.Author"
  flushCache="true"
  statementType="PREPARED"
  timeout="20">
```

### delete
下面就是 `update` 语句的示例

```xml
<delete id="deleteAuthor">
  delete from Author where id = #{id}
</delete>
```

`update` 元素的属性,[属性列表](#property)

```xml
<delete
  id="deleteAuthor"
  parameterType="domain.blog.Author"
  flushCache="true"
  statementType="PREPARED"
  timeout="20">
```

### 属性列表
<span id="property">属性的详细信息</span>

| 属性 | 描述 |
| --- | :-- |
| id | 在命名空间中唯一的标识符，可以被用来引用这条语句 |
| parameterType | 将会传入这条语句的参数类的完全限定名或别名。这个属性是可选的，因为 MyBatis 可以通过 TypeHandler 推断出具体传入语句的参数，默认值为 unset |
| ~~parameterMap~~ | ~~这是引用外部 parameterMap 的已经被废弃的方法。使用内联参数映射和 parameterType 属性~~ |
| resultMap | 外部 resultMap 的命名引用。结果集的映射是 MyBatis 最强大的特性，对其有一个很好的理解的话，许多复杂映射的情形都能迎刃而解。使用 resultMap 或 resultType，但不能同时使用 |
| flushCache | 将其设置为 true，任何时候只要语句被调用，都会导致本地缓存和二级缓存都会被清空，默认值：true（对应插入、更新和删除语句） |
| useCache | 将其设置为 true，将会导致本条语句的结果被二级缓存，默认值：对 select 元素为 true |
| timeout | 这个设置是在抛出异常之前，驱动程序等待数据库返回请求结果的秒数。默认值为 unset（依赖驱动） |
| fetchSize | 这是尝试影响驱动程序每次批量返回的结果行数和这个设置值相等。默认值为 unset（依赖驱动）。 |
| statementType | STATEMENT，PREPARED 或 CALLABLE 的一个。这会让 MyBatis 分别使用 Statement，PreparedStatement 或 CallableStatement，默认值：PREPARED。 |
| resultSetType | FORWARD_ONLY，SCROLL_SENSITIVE 或 SCROLL_INSENSITIVE 中的一个，默认值为 unset （依赖驱动） |
| useGeneratedKeys | （仅对 insert 和 update 有用）这会令 MyBatis 使用 JDBC 的 getGeneratedKeys 方法来取出由数据库内部生成的主键（比如：像 MySQL 和 SQL Server 这样的关系数据库管理系统的自动递增字段），默认值：false |
| keyProperty | （仅对 insert 和 update 有用）唯一标记一个属性，MyBatis 会通过 getGeneratedKeys 的返回值或者通过 insert 语句的 selectKey 子元素设置它的键值，默认：unset。如果希望得到多个生成的列，也可以是逗号分隔的属性名称列表。 |
| keyColumn | （仅对 insert 和 update 有用）通过生成的键值设置表中的列名，这个设置仅在某些数据库（像 PostgreSQL）是必须的，当主键列不是表中的第一列的时候需要设置。如果希望得到多个生成的列，也可以是逗号分隔的属性名称列表。 |

### sql
这个元素可以被用来定义可重用的 SQL 代码段，可以包含在其他语句中。它可以被静态地(在加载参数) 参数化. 不同的属性值通过包含的实例变化. 比如：

```xml
<sql id="userColumns"> ${alias}.id,${alias}.username,${alias}.password </sql>
```

这个 SQL 片段可以被包含在其他语句中，例如：

```xml
<select id="selectUsers" resultType="map">
  select
    <include refid="userColumns"><property name="alias" value="t1"/></include>,
    <include refid="userColumns"><property name="alias" value="t2"/></include>
  from some_table t1
    cross join some_table t2
</select>
```

属性值可以用于包含的 `refid` 属性或者包含的字句里面的属性值，例如：

```xml
<sql id="sometable">
  ${prefix}Table
</sql>

<sql id="someinclude">
  from
    <include refid="${include_target}"/>
</sql>

<select id="select" resultType="map">
  select
    field1, field2, field3
  <include refid="someinclude">
    <property name="prefix" value="Some"/>
    <property name="include_target" value="sometable"/>
  </include>
</select>
```

## 动态 SQL
### if
动态 `SQL` 通常要做的事情是有条件地包含 `where` 子句的一部分。比如:

```xml
<select id="findActiveBlogWithTitleLike"
     resultType="Blog">
  SELECT * FROM BLOG
  WHERE state = ‘ACTIVE’
  <if test="title != null">
    AND title like #{title}
  </if>
</select>
```

这条语句提供了一个可选的文本查找类型的功能。如果没有传入 `title`，那么所有处于 `ACTIVE` 状态的 BLOG 都会返回；反之若传入了 `title` ，那么就会把模糊查找 `title` 内容的 BLOG 结果返回。

### choose, when, otherwise
有些时候，我们不想用到所有的条件语句，而只想从中择其一二。针对这种情况，`MyBatis` 提供了 `choose` 元素，它有点像 `Java` 中的 `switch` 语句, `choose` 为 `switch`，`when` 为 `case`，`otherwise` 则为 `default`。

还是上面的例子，但是这次变为提供了 `title` 就按 `title` 查找，提供了 `author` 就按 `author` 查找，若两者都没有提供，就返回所有符合条件的 BLOG（实际情况可能是由管理员按一定策略选出 BLOG 列表，而不是返回大量无意义的随机结果）。

```xml
<select id="findActiveBlogLike"
     resultType="Blog">
  SELECT * FROM BLOG WHERE state = ‘ACTIVE’
  <choose>
    <when test="title != null">
      AND title like #{title}
    </when>
    <when test="author != null and author.name != null">
      AND author_name like #{author.name}
    </when>
    <otherwise>
      AND featured = 1
    </otherwise>
  </choose>
</select>
```

### trim, where, set
`<where>` 标签会知道如果它包含的标签中有返回值的话，它就插入一个 `WHERE`。此外，如果标签返回的内容是以 `AND` 或 `OR` 开头的，则它会剔除掉。

```xml
<select id="findActiveBlogLike"
     resultType="Blog">
  SELECT * FROM BLOG
  <where>
    <if test="state != null">
         state = #{state}
    </if>
    <if test="title != null">
        AND title like #{title}
    </if>
    <if test="author != null and author.name != null">
        AND author_name like #{author.name}
    </if>
  </where>
</select>
```

如果 `where` 元素没有按正常套路出牌，我们还是可以通过自定义 `trim` 元素来定制我们想要的功能。比如，和 `where` 元素等价的自定义 `trim` 元素为：

```xml
<trim prefix="WHERE" prefixOverrides="AND |OR ">
  ...
</trim>
```

`prefix` 内容之前加的前缀
`suffix` 内容之后加的后缀
`prefixOverrides` 属性会忽略通过管道分隔的文本序列（注意此例中的**空格**也是必要的）。它带来的结果就是所有在 `prefixOverrides` 属性中指定的内容将被移除，并且插入 `prefix` 属性中指定的内容。

当在 `update` 语句中使用 `<if>` 标签时，如果前面的 `<if>` 没有执行，则或导致逗号多余错误。使用 `<set>` 标签可以将动态的配置 `SET` 关键字，和剔除追加到条件末尾的任何不相关的逗号。

```xml
<update id="updateAuthorIfNecessary">
  update Author
    <set>
      <if test="username != null">username=#{username},</if>
      <if test="password != null">password=#{password},</if>
      <if test="email != null">email=#{email},</if>
      <if test="bio != null">bio=#{bio}</if>
    </set>
  where id=#{id}
</update>
```

若你对等价的自定义 `trim` 元素的样子感兴趣，那这就应该是它的真面目：

```xml
<trim prefix="SET" suffixOverrides=",">
  ...
</trim>
```

### foreach
`<foreach>` 是循环，用来读取传入的 `list` 参数,`<foreach>` 标签中的 `collection` 属性表示传入的是什么集合类型，`item` 表示的是集合

动态 SQL 的另外一个常用的必要操作是需要对一个集合进行遍历，通常是在构建 IN 条件语句的时候。比如：

```xml
<select id="selectPostIn" resultType="domain.blog.Post">
  SELECT *
  FROM POST P
  WHERE ID in
  <foreach item="item" index="index" collection="list"
      open="(" separator="," close=")">
        #{item}
  </foreach>
</select>
```

其中

* item： 就相当于 string 的作用，用来遍历 collection
* index： 就是集合的索引
* open： 表示标签以什么开始
* close： 表示标签以什么结束
* seprator： 表示元素之间的间隔

### bind
`bind` 元素可以从 OGNL 表达式中创建一个变量并将其绑定到上下文。比如：

```xml
<select id="selectBlogsLike" resultType="Blog">
  <bind name="pattern" value="'%' + _parameter.getTitle() + '%'" />
  SELECT * FROM BLOG
  WHERE title LIKE #{pattern}
</select>
```
对 `<bind>` 参数的调用可以通过 `#{}` 或 `${}` 方式获取，`#{}` 可以防止注入。

## 批量操作

### 批量删除

```xml
<delete id="deleteBatchByXXX" parameterType="list">
    DELETE FROM 表名 WHERE groupon_id IN
    <foreach collection="list" item="item" open="(" close =")" separator=",">
        #{item}
    </foreach >
</delete >
```

### 批量插入

```xml
<insert id="insertBatch" >
    INSERT INTO 表名 (uid, groupon_id, create_time, receive_time) VALUES
    <foreach collection="list" item="item" index ="index" separator=",">
        (#{item.uid}, #{item.grouponId}, #{item.createTime}, #{item.receiveTime})
    </foreach >
</insert>
```

### 批量更新
用法和之前的基本相同，但是需要注意传入的参数是 `map` 类型。

```xml
<update id="batchUpdateStudentWithMap" parameterType="java.util.Map" >
    UPDATE STUDENT SET name = #{name} WHERE id IN
    <foreach collection="idList" index="index" item="item" open="(" separator="," close=")">
        #{item}
    </foreach>
</update>
```

更新多条记录为多个字段为不同的值

```xml
<update id="updateBatch" parameterType="java.util.List">
    <foreach collection="list" item="item" index="index" open="" close="" separator=";">
        UPDATE course
        <set>
            name=${item.name}
        </set>
        WHERE id=${item.id}
    </foreach>
</update>
```

这样一条记录 `update` 一次，性能比较差，容易造成阻塞。

MySQL 没有提供直接的方法来实现批量更新，但可以使用 `case` `when` 语法来实现这个功能。

```sql
UPDATE course
    SET name = CASE id
        WHEN 1 THEN 'name1'
        WHEN 2 THEN 'name2'
        WHEN 3 THEN 'name3'
    END,
    title = CASE id
        WHEN 1 THEN 'New Title 1'
        WHEN 2 THEN 'New Title 2'
        WHEN 3 THEN 'New Title 3'
    END
WHERE id IN (1,2,3)
```

这条 SQL 的意思是，如果 `id` 为 1，则 `name` 的值为 name1，`title` 的值为 New Title1；依此类推

在 Mybatis 中的写法则如下：

```xml
<update id="updateBatch" parameterType="list">
    UPDATE course
    <trim prefix="SET" suffixOverrides=",">
        <trim prefix="peopleId=CASE" suffix="END,">
            <foreach collection="list" item="i" index="index">
                <if test="i.peopleId!=null">WHEN id=#{i.id} THEN #{i.peopleId}</if>
            </foreach>
        </trim>
        <trim prefix="roadgridid=CASE" suffix="END,">
            <foreach collection="list" item="i" index="index">
                <if test="i.roadgridid!=null">WHEN id=#{i.id} THEN #{i.roadgridid}</if>
            </foreach>
        </trim>
        <trim prefix="type=CASE" suffix="END," >
            <foreach collection="list" item="i" index="index">
                <if test="i.type!=null">WHEN id=#{i.id} THEN #{i.type}</if>
            </foreach>
        </trim>
        <trim prefix="unitsid=CASE" suffix="END," >
            <foreach collection="list" item="i" index="index">
                <if test="i.unitsid!=null">WHEN id=#{i.id} THEN #{i.unitsid}</if>
            </foreach>
        </trim>
    </trim>
    WHERE
    <foreach collection="list" separator="or" item="i" index="index">id=#{i.id}</foreach>
</update>
```

## 其它
### like
使用 LIKE 语句

```sql
--MySql
SELECT * FROM user WHERE name like CONCAT('%',#{name},'%')
--Oracle
SELECT * FROM user WHERE name like CONCAT('%',#{name},'%')
SELECT * FROM user WHERE name like '%'||#{name}||'%'
--SQLServer
SELECT * FROM user WHERE name like '%'+#{name}+'%'
--DB2
SELECT * FROM user WHERE name like CONCAT('%',#{name},'%')
SELECT * FROM user WHERE name like '%'||#{name}||'%'
```

或者使用bind

```xml
<select id="selectPersons" resultType="person" parameterType="person">
  <bind name="pattern" value="'%' + _parameter.username + '%'" />
  select id,sex,age,username,password
  from person
  where username LIKE #{pattern}
</select>
```

### #{} 和 ${}
`#{}` 与 `${}` 的区别
`#{}` 会根据传进来的参数的类型自动加上相应的信息，例如字符串两边会加上 ''，日期对象会自动的转化成 SQL 识别的内容，可以防止 SQL 注入攻击。
`${}` 直接替换，例如传进来的是字符串，不会在字符串两边加上 ''，使用的场景有如 `ORDER BY`，表名 等

### 使用 @Param 传递多个参数
传递多个参数可以使用

* Map
* JavaBean 中存放多个属性
* @Param

```java
public List<User> findUsers(@Param("offset") int offset, @Param("count") int count);
```

### CDATA
术语 `CDATA` 指的是不应由 XML 解析器进行解析的文本数据（Unparsed Character Data）。
在 `XML` 元素中，”<” 和 “&” 是非法的。

* “<” 会产生错误，因为解析器会把该字符解释为新元素的开始。
* “&” 也会产生错误，因为解析器会把该字符解释为字符实体的开始。

某些文本，比如 `JavaScript` 代码，包含大量 "<" 或 "&" 字符。为了避免错误，可以将脚本代码定义为 `CDATA`。
`CDATA` 部分中的所有内容都会被解析器忽略。
`CDATA` 部分由 `<![CDATA[` 开始，由 `]]>` 结束：

在 `mapper` 文件中写 `sql` 语句时，遇到特殊字符时，如：`<` 等，建议使用 `<![CDATA[ sql 语句 ]]>` 标记，将 `sql` 语句包裹住，不被解析器解析

## 参考链接
[mybatis](http://www.mybatis.org/mybatis-3/zh/getting-started.html
)
[Mybatis 语法](https://xtuer.github.io/spring-web-mybatis-syntax/)
