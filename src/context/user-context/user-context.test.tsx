import {userReducer, defaultState, State, UserActions} from "./user-context"



describe("userReducer", () =>{
    it("should log in", ()=>{
        const mockPayload:State = {username:"vsdvdbf", loggedIn: true}
        const mockType: UserActions = UserActions["LOG IN"]
        const result = userReducer(defaultState, {type: mockType, payload:mockPayload})

        expect(result).toEqual(mockPayload)
    })

    it("should log out", () =>{
    const mockPayload:State = {username:"vsdvdbf", loggedIn: true}
    const mockType: UserActions = UserActions["LOG OUT"]
    const result = userReducer(defaultState, {type: mockType, payload:mockPayload})

        expect(result).toEqual(defaultState)
    })
})

