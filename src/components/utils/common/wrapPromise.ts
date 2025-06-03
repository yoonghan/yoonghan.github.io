type Response = "pending" | "error" | "success"

function wrapPromise<T>(promise: Promise<T>) {
  let status: Response = "pending"
  let response: T

  const suspender = promise.then(
    (res) => {
      status = "success"
      response = res
    },
    (err) => {
      status = "error"
      response = err
    },
  )

  const handler = {
    pending: () => {
      throw suspender
    },
    error: () => {
      throw response
    },
    success: () => response,
  }

  const read = () => {
    return handler[status]()
  }

  return { read }
}

export default wrapPromise
