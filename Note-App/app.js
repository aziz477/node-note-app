const fs = require('fs')

const displayContent = (path, toDisplay) => {
    fs.readFile(path, (err, data) => {
        if (err) console.log('Something went wrong!')
        else {
            let jsonContent = JSON.parse(data)
            if (toDisplay === 'all') {
                jsonContent.map(el => console.log(`Title: ${el.title}\nBody: ${el.body}\n`))
            } else
                jsonContent.filter(el => el.title === toDisplay && console.log(`Title: ${el.title}\nBody: ${el.body}`))
        }
    })
}

const addToFile = (path, titleToAdd, bodyToAdd) => {
    const note = {
        title: titleToAdd,
        body: bodyToAdd
    }

    fs.readFile(path, (err, data) => {
        if (err) throw err
        let json = JSON.parse(data)

        json.push(note)

        fs.writeFile("data.json", JSON.stringify(json, null, 2), (err) => {
            if (err) throw err
            console.log('Note added successfuly')
        })
    })
}

const removeFromFile = (path, titleToRemove) => {
    fs.readFile(path, (err, data) => {
        if (err) console.log('Something went wrong!')
        else {
            let jsonContent = JSON.parse(data)
            const textContent = jsonContent.filter(el => el.title !== titleToRemove)
            fs.writeFile('data.json', JSON.stringify(textContent, null, 2), (err) => {
                if (err) console.log('Something went wrong!')
                console.log('Note removed successfuly!')
            })
        }
    })
}

switch (process.argv[2]) {
    case 'add': return addToFile('data.json', process.argv[3], process.argv[4]);
    case 'remove': return removeFromFile('data.json', process.argv[3]);
    case 'read': return displayContent('data.json', process.argv[3]);
    default: console.log('Please check your input!');
}