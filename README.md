# new-and-shiny
New &amp; Shiny

# responses

### response.body
```
response: [{
    data: [],
    error: true || false,
    message: {
        full: '',
        simple: ''
    }
}]
```
# /signup

## POST
```
input: {
    email: ''
}

output: {
    user: {
        id: '',
        email: ''
    }
}
```
### example
```
input: {
    email: 'abc@cba.com'
}

output: {
    user: {
        id: '42',
        email: 'abc@cba.com'
    }
}
```
# /signup/:confirmationCode

## GET
```
{
    user: {
        id: '',
        email: '',
        date: {
            created: '',
            updated: ''
        },
        active: true || false
        subscriptions: [{
            id: '',
            name: ''
        }],
        preferences: {
            nextEmail: '',
            frequency: daily || weekly
        }
    }
}
```
### example
```
{
    user: {
        id: '42',
        email: 'abc@cba.com',
        date: {
            created: '01/01/2017',
            updated: '01/01/2017'
        },
        active: true
        subscriptions: [{
            id: '2',
            name: 'Sequential Art'
        }],
        preferences: {
            nextEmail: '07/01/2017',
            frequency: daily
        }
    }
}
```
# /user/:userId

## GET
```
{
    user: {
        id: '',
        email: '',
        date: {
            created: '',
            updated: ''
        },
        active: true || false
        subscriptions: [{
            id: '',
            name: ''
        }],
        preferences: {
            nextEmail: '',
            frequency: daily || weekly
        }
    }
}
```
### example
```
{
    user: {
        id: '42',
        email: 'abc@cba.com',
        date: {
            created: '01/01/2017',
            updated: '01/01/2017'
        },
        active: true
        subscriptions: [{
            id: '2',
            name: 'Sequential Art'
        },
        {
            id: '5',
            name: 'XKCD'
        },
        {
            id: '9',
            name: 'Strays'
        }],
        preferences: {
            nextEmail: '07/01/2017',
            frequency: weekly
        }
    }
}
```
# /user/:userId

## PATCH
```
input: {
    user: {
        email: '',
        active: true || false
        subscriptions: [{
            id: '',
            name: ''
        }],
        preferences: {
            frequency: daily || weekly
        }
    }   
}

output: {
    user: {
        id: '',
        email: '',
        date: {
            created: '',
            updated: ''
        },
        active: true || false
        subscriptions: [{
            id: '',
            name: ''
        }],
        preferences: {
            nextEmail: '',
            frequency: daily || weekly
        }
    }
}
```
### example
```
input: {
    user: {
        email: 'abc@cba.com',
        active: false
        subscriptions: [],
        preferences: {
            frequency: weekly
        }
    }   
}

output: {
    user: {
        id: '42',
        email: 'abc@cba.com',
        date: {
            created: '01/01/2017',
            updated: '15/01/2017'
        },
        active: false
        subscriptions: [],
        preferences: {
            nextEmail: 'disabled',
            frequency: weekly
        }
    }
}
```
# /fetch/:crawlerId 

## GET
```
input: {}

output: {
    id: '',
    page: {
        url: '',
        text: {
            title: '',
            altText: '' || null
        },
        date: {
            created: ''
        }
    },
    image: {
        url: ''   
    }
}
```
### example
```
input: {}

output: {
    id: '1',
    page: {
        url: 'https://collectedcurios.com/sequentialart.php?n=976',
        text: {
            title: 'You are a bad lady and I do not like you',
            altText: null
        },
        date: {
            created: '24/03/2017'
        }
    },
    image: {
        url: 'https://sequentialart.com/976.jpg'   
    }
}
```
# /email

## GET
```
input: {}

output: {
    recipients: [{
        id: '',
        email: ''
    }]
}
```
### example
```
input: {}

output: {
    recipients: [{
        id: '42',
        email: 'abc@cba.com'
    }]
}
```
# /email/:userId

## GET
```
input: {}

output: {
    recipients: [{
        id: '',
        email: ''
    }]
}
```
### example
```
input: {}

output: {
    recipients: [{
        id: '42',
        email: 'abc@cba.com'
    }]
}
```