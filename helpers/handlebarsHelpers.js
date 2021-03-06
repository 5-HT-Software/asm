module.exports = {
  ifCond: (v1, operator, v2, options) => {
    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this)
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this)
      case '!=':
        return (v1 != v2) ? options.fn(this) : options.inverse(this)
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this)
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this)
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this)
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this)
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this)
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this)
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this)
      default:
        return options.inverse(this)
    }
  },

  contentSummary: (content, options) => {
    return content.replace(/<img .*?>/g, "").substring(0, 300) + "...";
  },

  checkNull: (v, options) => {
    return v == null ? options.fn(this) : options.inverse(this)
  },

  section: function (name, options) {
    if (!this._sections) this._sections = {}
    this._sections[name] = options.fn(this)
    return null
  },
  makeLink: function (value, options) {
    return value.toUpperCase()
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
  },
  json: function (context) {
    return JSON.stringify(context)
  },
  inc: function (number) {
    return parseInt(number) + 1
  },

  breakLineTextarea: function (string) {
    console.log(string.replace(/\\n/g, ""))
    let json = JSON.stringify(string).replace(/\\n/g, "")
    return JSON.parse(json)
  },
  durationConv: (duration) => {
    duration = parseInt(duration)
    let days = Math.floor(duration / (3600 * 24))
    duration -= days * 3600 * 24
    let hours = Math.floor(duration / 3600)
    duration -= hours * 3600
    let minutes = Math.floor(duration / 60)
    duration -= minutes * 60
    if (days === 0 && hours === 0)
      return `${minutes} dk ${duration} sn`
    return `${hours * days} sa ${minutes} dk`
  },
  dateConv: (date) => {
    date = Date.now() - date
    date /= 1000
    if (date < 60)
      return Math.round(date) + " Saniye ??nce"
    date /= 60
    if (date < 60)
      return Math.round(date) + " Dakika ??nce"
    date /= 60
    if (date < 24)
      return Math.round(date) + " Saat ??nce"
    date /= 24
    if (date < 7)
      return Math.round(date) + " G??n ??nce"
    if (date < 30)
      return Math.round(date / 7) + " Hafta ??nce"
    date /= 30
    if (date < 12)
      return Math.round(date) + " Ay ??nce"
    date /= 12
    return Math.round(date) + " Y??l ??nce"
  },

  dateTrConv: (d) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    let date = new Date(parseInt(d)).toLocaleString('tr-TR', options)
    return date
  }
}

