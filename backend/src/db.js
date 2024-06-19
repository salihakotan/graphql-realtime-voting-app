const questions = [
    {
        id:"1",
        title:"Night or Morning",
        options: [
            {
                id:"1",
                text:"Night"
            },
            {
                id:"2",
                text:"Morning"
            },
            {
                id:"3",
                text:"Both"
            }
        ]
    }
]


const votes = [
    {
        question_id:"1",
        option_id:"1",
    }
]


const db = {
    questions,
    votes
}

export {db}