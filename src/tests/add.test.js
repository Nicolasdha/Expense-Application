const add = (a, b) => a+b
const generateGreeting =(name = 'Anon')=> `Hello ${name}!`;

test('should add two numbers', () =>{  
    const result = add(3, 4);
    expect(result).toBe(7);
})

test('should generate greeting for name passed in', () =>{
    const result = generateGreeting('Mike');
    expect(result).toBe('Hello Mike!')
})

test('should generate greeting for anon', () =>{
    const result = generateGreeting();
    expect(result).toBe('Hello Anon!')
})