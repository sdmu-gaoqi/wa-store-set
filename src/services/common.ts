const getPerms = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['perm-1'])
        }, 1000)   
    })
}