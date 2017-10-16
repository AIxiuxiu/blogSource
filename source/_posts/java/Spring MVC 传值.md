---
title: Spring MVC 传值
date: 2017-09-11 15:30:01
categories:
- java
tags:
- SpringMVC
---
# Spring MVC 传值
## HttpServletRequest
通过HttpServletRequest 。写法如下：

```java
@RequestMapping("/test")
public void test(HttpServletRequest request) {
   System.out.println("name:" +request.getParameter("name"));
}
```
`HttpServletRequest` 类是 `Servlet` 中的类型，代表了一个 `Servlet` 请求。无论`Post` 还是 `Get` 请求，都能通过这种方式获取到。

比如上面的代码，通过Get方法，如下地址 `/test?name=test` 访问。
<!-- more -->
还可以通过注解 `@Autowired`，将 `HttpServletRequest` 自动的注入进来，但是不推荐使用这个方法，因为这种方法破坏了对一个注入对象的常规理解，造成混乱。

```java
@Autowired
private HttpServletRequest request;
@RequestMapping(value="/test")
public void test() {
   System.out.println("name:" +request.getParameter("name"));
}
```

## 路径变量
### @PathVariable 
使用路径变量。写法如下：

```java
@RequestMapping("/test/{name}")
public void test(@PathVariable String name) {
   System.out.println("name:" + name);
}
```

`@RequestMapping` 中的 `{}` 包含内容即为路径变量，该变量还需要在方法的参数值出现，并且标记 `@PathVariable`。
通过URL匹配的方式既可以实现传值，这是REST风格的一种传值方式，但是参数中有连续**两个空格**在微信跳转时会出现链接无法解析的提示。

上面的例子，只需输入URL: `/test/name` 

`@RequestMapping("/test/{name}")` 是 `@RequestMapping(Value="/test/{name}")` 的缩写形式，本质上是一样的。@RequestMapping 中的 `value` 和 `path` 属性（这两个属性作用相同，可以互换，如果仅有这一个属性，则可以省略）

`@PathVariable` 还可以使用**正则表达式**

如路径 /spring-web/spring-web-4.0.0.jar

```java
@RequestMapping("/spring-web/-{version:\\d\\.\\d\\.\\d}{extension:\\.[a-z]+}")
    public void handle(@PathVariable String version, @PathVariable String extension) {
        System.out.println("version:" + version);
        System.out.println("extension:" + extension);
    }
}
```

**通配符** 也可以 如 /owners/*/name/

### @MatrixVariables
要使用@MatrixVariable首先需要将配置文件中的

```
<mvc:annotation-driven />
```
改为

```
<mvc:annotation-driven enable-matrix-variables="true" />
```

`@MatrixVariable` 可以获取到路径 `/user;name=test;age=22` 中 `name` 和 `age` 的值
如下：

```java
@RequestMapping(path = "/test", method = RequestMethod.GET)
public @ResponseBody String findPet(@MatrixVariable String q) {
   System.out.println("q=" + q);
}
```
   
访问路径 /test;q=1;q=2  会得到结果 `q=1,2`

因为所有路径中都可以携带matrix 变量，所有需要明确指出matrix 变量所在的位置

```java
// GET /test/42;q=11/pets/21;q=22

@RequestMapping(path = "/test/{ownerId}/pets/{petId}", method = RequestMethod.GET)
public void findPet(@MatrixVariable(name="q", pathVar="ownerId") int q1,
                    @MatrixVariable(name="q", pathVar="petId") int q2) {
    System.out.println("q1=" + q1);  // q1 = 11
    System.out.println("q2=" + q2);   // q2 = 22
}
```

matrix 变量是可选的，也可以是指默认值

```java
/ GET /pets/42

@RequestMapping(path = "/pets/{petId}", method = RequestMethod.GET)
public void findPet(@MatrixVariable(required=false, defaultValue="1") int q) {
    System.out.println("q=" + q); // q2 = 1
}
```

所有的matrix 变量都可以通过map获取

```java
// GET /owners/42;q=11;r=12/pets/21;q=22;s=23

@RequestMapping(path = "/owners/{ownerId}/pets/{petId}", method = RequestMethod.GET)
public void findPet(
        @MatrixVariable Map<String, String> matrixVars,
        @MatrixVariable(pathVar="petId"") Map<String, String> petMatrixVars) {
    // matrixVars: ["q" : [11,22], "r" : 12, "s" : 23]
    // petMatrixVars: ["q" : 11, "s" : 23]
}
```

## 参数名匹配的方式
参数名匹配的方式:
使用注解 `@RequestParam` 

```java
@RequestMapping(value="/test")
public void test(@RequestParam("name") String name) {
   System.out.println("name:" +name);
}
```

或者直接匹配参数（参数名字一样的时候）：

```java
@RequestMapping(value="/test")
public void test(String name) {
   System.out.println("name:" +name);
}
```

如果请求中参数的名字和变量名不一样的时候，就只能使用 `@RequestParam` 注解，尽量使用`@RequestParam` 注解，因为这样可以清晰的知道该参数来自 `Request`，可读性高。
使用注解 `@RequestParam`，可以设置一个默认值来处理到 `null` 值，如果传递的参数是可选的需要将@RequestParam的required设为false

```java
@RequestParam(value="name", required=false, defaultValue="test")
```

这样传值和 `HttpServletRequest` 一样，支持 `Get` 和 `Post` 请求,也支持表单上传。

多个参数还可以用map来接收

```java
//GET  /user?name=test&age=22
@RequestMapping(value="/user",method = RequestMethod.GET)
    public @ResponseBody String requestParam3(@RequestParam Map<String,String> map) {
        return map.toString(); //{name=test,age=22}
}
```
    
## 请求头
传递请求头中的参数，需要用到 `@RequestHeader` 注解，该注解将 `Header` 中的值绑定到参数上，可以获取一个，多个或者所有的参数。例如

```java
@RequestMapping(value="/print")
public void test(@RequestHeader Map<String, String> headers) {
   for (String elem: headers.keySet()) {
       System.out.println(elem + " : " + headers.get(elem));
   }
}
```

```java
@RequestMapping(value="/print")
public void test(@RequestHeader("name") String name) {
   System.out.println("name:" +name);
}
```

## @RequestBody
配合 `@RequestBody` 注解，以及 `HTTP Request Header` 中的 `Content-Type` 属性，`HTTP Request Body` 中包含的 `XML` 或者 `JSON` 数据可以自动被转换成对应的`Java` 对象。

需要添加jackson依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.8.1</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.8.1</version>
</dependency>
```
开启<mvc:annotation-driven />

JSON.stringify(）将json对象转换为json字符串传递。或者直接传递json字符串，但json字符串必须在里面使用双引号，外面使用单引号，使用JSON.stringify(）就可以不考虑

```java
@RequestMapping("/testJson")
@ResponseBody
public void testJson(@RequestBody Standard standard) {
    System.out.println(standard.getName());
    System.out.println(standard.getStandardEntities().size());
}
```

可以使用 `Ajax` 请求方式

```js
$.ajax({
    url: "/testJson",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
            'id':'1',
            'name':'名字',
            'standardEntities':[{'id':'1', 'entityName':'实体'}]}),
    success:function(data){
    }
});
```


```java
/** 
 * 根据request header中的Content-Type自动转换XML/JSON->UserDTOX对象 
 * 根据request header中的Accept自动选择返回XML or JSON 
 */  
@ResponseBody  
@RequestMapping(value="/createUser", method = RequestMethod.POST)  
public UserDTOX createUser(@RequestBody UserDTOX userDTOX) {  
    logger.debug("creating a UserDTO:[{}]", userDTOX);  
    return new UserDTOX("Hi " + userDTOX.getName(), userDTOX.getAge() + 1);  
}  
```

运行以下两个测试函数

```java
//json请求
@Test  
public void testJsonRequestResponse() throws IOException, URISyntaxException {  
      
    String url = "http://localhost:8080/SpringMVC/createUser";  
    HttpHeaders requestHeaders = new HttpHeaders();  
    requestHeaders.set("Accept", "application/json");  
    requestHeaders.set("Content-Type", "application/json");  
  
    String jsonStr = "{\"name\":\"Jack\",\"age\":16}";  
  
    RestTemplate restTemplate = new RestTemplate();  
    HttpEntity<String> httpEntity = new HttpEntity<String>(jsonStr, requestHeaders);  
    String jsonData = restTemplate.postForObject(url, httpEntity, String.class);  
  
    System.out.println(jsonData);  
}  

//xml请求
@Test  
public void testXmlRequestResponse() throws IOException, URISyntaxException {  
      
    String url = "http://localhost:8080/SpringMVC/createUser";  
    HttpHeaders requestHeaders = new HttpHeaders();  
    requestHeaders.set("Accept", "application/xml");  
    requestHeaders.set("Content-Type", "application/xml");  
  
    String xmlStr = "<userDTOX><name>Jack</name><age>16</age></userDTOX>";  
  
    RestTemplate restTemplate = new RestTemplate();  
    HttpEntity<String> httpEntity = new HttpEntity<String>(xmlStr, requestHeaders);  
    String xmlData = restTemplate.postForObject(url, httpEntity, String.class);  
  
    System.out.println(xmlData);  
}  
```

## @ResponseBody
该注解用于将 `Controller` 的方法返回的对象，根据 `HTTP Request Header` 的 `Accept` 的内容,通过适当的 `HttpMessageConverter` 转换为指定格式后，写入到`Response` 对象的 `body` 数据区。

返回json需要添加jackson依赖，并开启<mvc:annotation-driven />


```java
@RequestMapping("/testResponseBody")
    public @ResponseBody
    Person testResponseBody() {
        Person p = new Person();
        p.setName("xiaohong");
        p.setAge(12);
        return p;
    }
```

返回xml需要 XML注解
```java
@XmlRootElement(name = "Person")
public class Person {
    private String name;
    private int age;
    public String getName() { return name;    }
    @XmlElement
    public void setName(String name) { this.name = name;    }
    public int getAge() { return age;    }
    @XmlElement
    public void setAge(int age) { this.age = age;    }
}
```

Ajax代码

```js
$.ajax({
    url: "testResponseBody",
    type: 'GET',
    headers: {
        Accept: "application/xml",
        //Accept:"application/json",
    },
    success: function(data, textStatus){
        console.log(data);
        alert(data);
    },
    error: function (data, textStatus, errorThrown) {
        console.log(data);
    },
        });
```

如果没有配置Person类的XML注解,那么只会JSON数据,无论Accept是什么，改accept: "application/json",即可返回JSON数据.

## ModelAndView

```java
@RequestMapping("/hello")
public ModelAndView showMessage() {
    ModelAndView mv = new ModelAndView("helloworld");
    mv.addObject("title", "test");
    return mv;
}
```
JSP页面中：


```jsp
<%@ page language="java" contentType="text/html; charset=utf-8"
pageEncoding="utf-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>${title}</title>
</head>
</html>
```

ModelAndView 初始化的时候，设置了view的名字，同时也把对象存起来，直接传给view。简单实用。

## ModelMap
该方法和 ModelAndView 方法相似，只是 Model 和 View 分开来了，通过返回一个 String 来找到 View，Model 是注入到 Controller 的一个参数，通过对它添加属性，在jsp端读取值

```java
@Controller
public class HelloWorldController {
    @RequestMapping("/hello")
    public String showMessage(Model model) {
    model.addAttribute("message", "Welcome to Spring MVC!");
    return "test";
}
```

JSP页面中：
```jsp
<%@ page language="java" contentType="text/html; charset=utf-8"
pageEncoding="utf-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>test</title>
</head>
    <body>${message}</body>
</html>
```

## 参考链接
[Spring MVC 传值方式总结](http://bijian1013.iteye.com/blog/2310240)
[SpringMVC中使用@RequestBody,@ResponseBody注解实现Java对象和XML/JSON数据自动转换（上）](http://blog.csdn.net/fw0124/article/details/48280083)
[SpringMVC中使用@RequestBody,@ResponseBody注解实现Java对象和XML/JSON数据自动转换（下）](http://blog.csdn.net/fw0124/article/details/48312317)
[SpringMVC中的参数绑定总结](http://blog.csdn.net/eson_15/article/details/51718633)


