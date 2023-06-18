exports.generateDefault = () => {
     let role = "normal"
     return role
}

exports.classifyBus = val => {
     let category
     if (val >= 18 && val < 30) {
          category = "small"
     } else if (val >= 30 && val < 60) {
          category = "medium"
     } else if (val >= 60) {
          category = "large"
     }
     return category
}
