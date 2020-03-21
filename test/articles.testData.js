
module.exports ={
    generateTestArticlesData() {
        return [
            {
                id: 1, 
                title: 'First test post!', 
                //date_published: new Date('2020-03-03T03:25:53.581Z'), 
                date_published: '2020-03-03T03:25:53.581Z', 
                content: 'This is the content of the First test post', 
                style: 'News', 
                author: 1
            },
            {
                id: 2, 
                title: 'Second test post!', 
                date_published: '2020-03-04T03:25:53.581Z',
                content: 'This is the content of the Second test post', 
                style: 'Story', 
                author: 2
            },
            {
                id: 3, 
                title: 'Third test post!', 
                date_published: '2020-03-05T03:25:53.581Z', 
                content: 'This is the content of the Third test post', 
                style: 'How-to', 
                author: 3
            }
        ]
    }
}
