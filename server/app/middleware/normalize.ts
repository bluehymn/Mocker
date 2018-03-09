export default (options) => {
  return async function normalize(ctx, next) {
    await next()
    
    options

    let body = ctx.body
    if (!body) return

    ctx.body = body[1]
    ctx.status = body[0]
  
  }
}
