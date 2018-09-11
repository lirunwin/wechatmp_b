const freePass = ['/user/signup', '/user/signin']
export default ({ store, route, redirect }) => {
  let currentUser = store.getters['auth/loggedIn']
  let isFreePass = !!freePass.find(free => free === route.path)
  // console.log(isFreePass ? '这个链接不需要登录' : '这个链接需要登录哦')
  // console.log(currentUser ? '登录了的' : '没有登录啊', currentUser)
  if (route.path === '/user/signin' && currentUser) {
    // redirect to '/', if user is already loged TODO: get user's location on '/' and set a spinner
    redirect('/job')
  } else if (!(isFreePass || currentUser)) {
    // redirect to '/user/signin' when user is not loged in
    redirect('/user/signin')
  }
}
