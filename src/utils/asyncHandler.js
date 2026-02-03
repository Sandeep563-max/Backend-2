const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err))
    }
}


export {asyncHandler}


// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

     //  Raper function that will be used everywhere instead of writing async await code everytime
// const asyncHandler = (fn) => async (req ,res ,next) => {
//     try{
//         await fn(req,res,next)
//     }catch (error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }