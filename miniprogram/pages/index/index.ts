const app = getApp<IAppOption>()

Component({

  data: {

    // 首页标题
    title: "屿途校园",

    subtitle: "连接校园生活，发现身边精彩",

    // API返回的数据
    posts: [],

    loading: true,

    error: ""

  },


  lifetimes: {

    attached() {

      this.loadPosts()

    }

  },


  methods: {


    // 请求YutuHub后端
    loadPosts() {


      wx.request({

        url:
          app.globalData.apiBase + "/posts?sort=latest",


        method: "GET",


        success: (res:any)=>{


          console.log("YutuHub API:", res.data)


          if(res.data){


            this.setData({

              posts: res.data.items || [],

              loading:false

            })


          }


        },


        fail:(err)=>{


          console.error("API请求失败:",err)


          this.setData({

            error:"服务器连接失败",

            loading:false

          })


        }


      })

    },


    // 点击刷新
    refresh(){

      this.setData({

        loading:true

      })


      this.loadPosts()

    },


    // 跳转发布
    createPost(){

      wx.showToast({

        title:"发布功能开发中",

        icon:"none"

      })

    },


    // 跳转详情
    viewPost(e:any){


      const id=e.currentTarget.dataset.id


      console.log("查看帖子:",id)


    }


  }

})