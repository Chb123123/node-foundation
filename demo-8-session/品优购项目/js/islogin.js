
  window.addEventListener('load', function() {
    axios({
      method: 'get',
      url: 'http://127.0.0.1/api/username'
    }).then(res => {
      console.log(res.data)
      if(res.data.status === 0) {
        this.location.href ='http://127.0.0.1:5500/%E5%A5%BD%E7%9C%8B%E7%9A%84%E7%99%BB%E5%85%A5%E7%95%8C%E9%9D%A2/index.html'
      }
    })
  })
