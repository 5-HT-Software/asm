///Helper Functions
const passArrayFromString = (str) => {
  let arr = str.split(",")
  if (arr.length == 0) return "[]"
  let arrayStr = "["
  arr.forEach((p) => {
    arrayStr += '"' + p + '",'
  })
  arrayStr += "]"
  return arrayStr
}

const passArray = (arr) => {
  if (arr.length == 0) return "[]"
  let arrayStr = "["
  arr.forEach((p) => {
    arrayStr += '"' + p + '",'
  })
  arrayStr += "]"
  return arrayStr
}

const stringify = (arr) => {
  arr.tags = [1, 2, 3]
  for (const key in arr) {
    if (arr[key] instanceof Array) {
      arr[key] = passArray(arr[key])
    }
  }
}

const passArrayForOrder = (arr) => {
  let arrayStr = "["
  arr.forEach((p) => {
    arrayStr += "{"
    arrayStr += 'id : "' + p.id + '",'
    arrayStr += "order : " + p.order
    arrayStr += "},"
  })
  arrayStr += "]"
  return arrayStr
}

const escapeQuotes = (str) => {
  str = JSON.stringify(str)
  return str
}

const getFields = (fields) => {
  let allFields = ""

  if (Array.isArray(fields))
    Object.entries(fields).forEach(([key, value], index) => {
      if (Object.prototype.toString.call(value) === '[object Object]') allFields += getFields(value)
      else allFields += value
      if (index !== Object.entries(fields).length - 1) allFields += ","
    })
  else allFields += `${Object.keys(fields)[0]}{${getFields(Object.values(fields)[0])}}`

  return allFields
}

const getObjects = (args) => {
  let query = ""

  Object.entries(args).forEach(([key, value], index) => {
    query += `{${getArguments(value)}}`
    if (index !== Object.entries(args).length - 1) query += ","
  })

  return query
}

const getArrays = (args) => {
  let query = ""
  if (args.length == 0) return "[]"
  Object.entries(args).forEach(([key, value], index) => {
    if (index === 0) query += "["
    if (Object.prototype.toString.call(value) === '[object Object]') query += `${getObjects([value])}`
    else query += `${JSON.stringify(value)}`
    if (index !== Object.entries(args).length - 1) query += ","
    if (index === Object.entries(args).length - 1) query += "]"
  })

  return query
}

const getArguments = (args) => {
  let query = ""

  Object.entries(args).forEach(([key, value], index) => {
    if (Array.isArray(value)) query += `${key}:${getArrays(value)}`
    else if (Object.prototype.toString.call(value) === '[object Object]') {
      query += `${key}:${getObjects([value])}`
      if (index !== Object.entries(args).length - 1) query += ","
    } else {
      query += `${key}:${JSON.stringify(value)}`
      if (index !== Object.entries(args).length - 1) query += ","
    }
  })

  return query
}

const builder = (queryName, args = null, fields = null) => {
  let query = ""
  query += queryName
  if (args) query += `(${getArguments(args)})`
  if (fields) query += `{${getFields(fields)}}`
  return query
}

const queryBuilder = (query) => {
  const queryType = Object.keys(query)[0]
  const queryNames = []
  let result = queryType + "{"
  Object.keys(query[queryType]).forEach((key) => queryNames.push(key))
  queryNames.forEach((queryName) => {
    result += builder(queryName, query[queryType][queryName].args, query[queryType][queryName].fields)
  })
  result += "}"
  return result

}

///Helper Functions
module.exports = {
  passArrayFromString,
  passArray,
  passArrayForOrder,
  escapeQuotes,
  stringify,
  queryBuilder
}