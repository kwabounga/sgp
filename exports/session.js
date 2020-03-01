exports.getCode = function(){
  let code = {}
  code.tools = {
    padZeros: function(num, nbZeros ){
      var numSize = num.toString().length
      var result = ''
      for (var i = 0; i < (nbZeros - numSize); i++) {
        result += '0'
      }
      result += num.toString()
      return result
    },
    date: function(){
      let dt = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000 ))
      return dt
    }
  }
  let code_session = ''
  let encryption =  ''
                  + (Math.floor(code.tools.date().getMinutes() / 4))
                  + code.tools.padZeros(code.tools.date().getDate(),2)
                  + code.tools.padZeros(code.tools.date().getMinutes(),2)
                  + code.tools.padZeros(code.tools.date().getHours(),2)
                  + code.tools.date().getFullYear()
  code_session = Math.floor(encryption / 564);
  return code_session;
}
