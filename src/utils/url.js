let Baseurl = ''
if (process.env.NODE_ENV == 'development') {
    Baseurl = "http://39.99.129.24:8001"
    // Baseurl = '/api'
} else if (process.env.NODE_ENV == 'production') {
    Baseurl = '/admin'
}


// 获取图形验证码
const captcha = Baseurl + '/captcha.jpg'

// 登录
const login = Baseurl + '/login'

// 删除角色
const delrole = Baseurl + '/role/del/'

// 新增角色
const rolesave = Baseurl + '/role/save'

// 获取角色列表 不分页
const getrolefindList = Baseurl + '/role/findList'

// 获取角色列表
const getrolelist = Baseurl + '/role/findPage'

// 获取用户列表
const getuserlist = Baseurl + '/user/findPage'

// 新增用户
const usersave = Baseurl + '/user/save'


export const urls = {
    getuserlist,
    usersave,
    delrole,
    rolesave,
    getrolefindList,
    getrolelist,
    captcha,
    login,
}

