export default {
  data : {
    loading: true,
    carouselList: [],
    textList: []
  },
  onLoad(){
    /*cube 被加载之后 */
  },
  onReady(){
    /*cube 被添加到页面之后 */
    this.request({
      api:'list',
      complete: (offlineData, res) => {
        this.setData({
          loading: false
        })

        if (res && res.errno === 0) {
          const data = res.data.img_list ? res.data : offlineData
          this.handleData(data)
          this.setStorage({
            key: 'data',
            data: data
          })
        } else {
          this.getStorage({
            key: 'data',
            success: res => {
              const data = res || offlineData
              this.handleData(data)
            }
          })
        }
      }
    })
  },
  handleData (data) {
    const dataList = this.formatData(data)
    const carouselList = this.transformData(dataList.slice(0, 6))
    const textList = dataList.slice(6, 12)
    this.setData({
      carouselList,
      textList
    })
  },
  formatData (data) {
    const tmprtp = encodeURIComponent(this.getCubeInfo().tmprtp) || ''
    return data.map(({id, title, image, online_tag, tags}) => {
      return {
        title,
        url: `https://yule.360.cn/detail/${id}?tmprtp=${tmprtp}`,
        pic: image,
        onlineTag: online_tag.split(',')[0] || '',
        tags,
        tagsUrl: `https://yule.360.cn/list?tag=${tags}`
      }
    })
  },
  transformData (data) {
    let len = data.length
    let n = 2
    let lineNum = len % n === 0 ? len / n : Math.floor( len / n )
    var res = []
    for (var i = 0; i < lineNum; i++) {
      let temp = data.slice(i*n, i*n+n)
      res.push(temp)
    }
    return res
  }
}