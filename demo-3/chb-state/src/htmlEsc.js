function htmlEsc (data) {
  return data.replace(/<|>|&|"|'/g, function(match) {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case '&':
        return 'amp;'
    }
  })
}

module.exports = {
  htmlEsc
}