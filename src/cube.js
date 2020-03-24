import CubeCarousel from './components/Carousel/index.js'

export default {
  data : {
    loading: true,
    carouselList: [],
    textList: [],
    carouselTpl: [
      '{{#list item as item2 by item2_index}}',
        '<a href="{{item2.url}}" target="_blank">',
          '<img src="{{item2.pic | clipImage:\'180_100_75\'}}" width="180" height="100" alt="">',
          '<p class="ext">',
            '<span class="bg"></span>',
            '<span class="title">{{item2.title}}</span>',
          '</p>',
        '</a>',
        '{{/list}}',
    ].join('')
  },
  onLoad(){
    /*cube 被加载之后 */
    this.createComponent(CubeCarousel)
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
    const carouselList = this.transformData(data.img_list)
    const textList = data.text_list
    this.setData({
      carouselList,
      textList
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