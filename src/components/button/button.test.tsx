import React from 'react';
import { mount, shallow } from 'enzyme';
import Button from "./button";


describe("button tests", ()=>{
    it("should execute correct function on click", () =>{
        const text = "TEST TEXT"
        let testVar = 0
        const testFunc = jest.fn( () => {testVar = 1})
        const wrapper = mount(<Button text={text} onClick={testFunc} ></Button>)
        const btn = wrapper.find('.button')
        btn.simulate('click')

        expect(testFunc).toBeCalledTimes(1)
        expect(testVar).toBe(1)
    })

    it("should have correct text", () =>{
        const text = "TEST TEXT"
        const testFunc = jest.fn()
        const wrapper = mount(<Button text={text} onClick={testFunc} ></Button>)
        const btn = wrapper.find('.button')

        expect(btn.text()).toBe(text)
    })
    
})