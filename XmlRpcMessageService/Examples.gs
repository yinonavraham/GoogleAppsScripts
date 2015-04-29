//Example input:
//  methodCallObj = {
//    methodName : "LogIn",
//    params : [
//      {
//        type : "string",
//        value : "blabla"
//      },
//      {
//        type : "array",
//        value : [
//          {
//            type : "string",
//            value : "David"
//          },
//          {
//            type : "string",
//            value : "Golan"
//          }
//          ]
//      },
//      {
//        type : "struct",
//        value : [ /*members:*/
//          {
//            name : "qwerty",
//            value : {
//              type : "double",
//              value : 1234
//            }
//          },
//          {
//            name : "asdf",
//            value : {
//              type : "string",
//              value : "hello"
//            }
//          }
//          ]
//      }
//      ]
//  }
//Example output:
// <methodCall>
//   <methodName>LogIn</methodName>
//   <params>
//     <param>
//        <value><string>blabla</string></value>
//     </param>
//     <param>
//        <value>
//          <array>
//            <data>
//              <value><string>David</string></value>
//              <value><string>Golan</string></value>
//            </data>
//          </array>
//        </value>
//      </param>
//      <param>
//        <value>
//          <struct>
//             <member>
//               <name>qwerty</name>
//               <value><double>1234</double></value>
//             </member>
//             <member>
//               <name>asdf</name>
//               <value><string>hello</string></value>
//             </member>
//           </struct>
//         </value>
//       </param>
//     </params>
//   </methodCall>
// </methodCall>

//Semantic method call
//For example:
//{
//  methodName : "LogIn",
//  params : [
//    1,
//    "hello",
//    { prop1 : 1, prop2 : "ACB" },
//    [ 1, 2, 3]
//    ]
//}


//function login() {
//  Logger.log("Logging in...");
//  var methodCall = {
//    methodName : "LogIn",
//    params : [
//      "", "", "he", "OS Test User Agent"
//      ]
//  };
//  var url = "http://api.opensubtitles.org/xml-rpc";
//  var methodResponse;
//  execMethodCall(url,methodCall,function(mr){methodResponse=mr;});
//  var token = methodResponse.params[0].token;
//  Logger.log('Logged in. Token: ' + token);
//}


//function testBinding() {
//  var url = "https://wordpress.com/xmlrpc.php";
//  var service = bind(url);
//  var result = service["wp.getUsersBlogs"]("username", "password");
//  Logger.log(result);
//}
