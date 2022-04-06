import {useFetchCargos} from "./fetch-cargo"
import {renderHook, act} from '@testing-library/react-hooks'
import { FetchState } from "../interfaces";
import axios from "axios";
import { API_URL } from "../global-vars";
import faker from 'faker'


describe('fetching cargos hook', () =>{
    const renderCustomHook = () => renderHook(() => useFetchCargos());

    it("should return initual value", () => {
        const hook = renderCustomHook();
        const [cargos, fetchState, getCargos] = hook.result.current;

        expect(cargos).toEqual([]);
        expect(fetchState).toBe(FetchState.DEFAULT);
        expect(typeof getCargos).toBe('function');
    })


    it('should have expected endpoint on api call', async () => {
        const axiosGetSpy = jest.spyOn(axios, 'get').mockResolvedValue({data: []})

        const hook = renderCustomHook();
        const getCargos = hook.result.current[2];

        await act( async () => {
            await getCargos();
        })
        

        expect(axiosGetSpy).toBeCalledTimes(1);
        expect(axiosGetSpy).toBeCalledWith(`${API_URL}/cargos`)
    })

    it('should have expected states on api call', async () =>{
        jest.spyOn(axios, 'get').mockResolvedValue({data: []})

        const hook = renderCustomHook();
        const getCargos = hook.result.current[2];

        // We don't want to await for act because it will set state to SUCESS
        // What we want to do to test if fetch state is being set to LOADING before
        // request is resolved
        const promiseAct = act( async () => {
            await getCargos();
        })
        
        const [cargos, fetchState] = hook.result.current;

        expect(cargos).toEqual([])
        expect(fetchState).toBe(FetchState.LOADING)

        // Now we await to make compiler happy and to avoid unexpected behavior
        await promiseAct;
    });

    it('should have expected states on api error', async () => {
        jest.spyOn(axios, 'get').mockRejectedValue({})

        const hook = renderCustomHook();
        const getCargos = hook.result.current[2];

        await act( async () => {
            await getCargos();
        })
        
        const [cargos, fetchState] = hook.result.current;

        expect(cargos).toEqual([])
        expect(fetchState).toEqual(FetchState.ERROR)

    })


    it('should have expected states on api sucess', async () => {
        const mockCargos = {
            data: {data: [
                {
                    _id: faker.datatype.number(),
                    name: faker.datatype.string(),
                    weight: faker.datatype.number(),
                    weightunit: faker.datatype.string(),
                    quantity: faker.datatype.number(),
                    quantityunit: faker.datatype.string(),
                    info: faker.datatype.string(),
                    addedby: faker.datatype.string(),
                    added: faker.datatype.string(),
                    lastmodified: faker.datatype.string(),
                    modifiedby: faker.datatype.string(),
                },
            ],
        }};

        jest.spyOn(axios, 'get').mockResolvedValue(mockCargos)

        const hook = renderCustomHook();
        const getCargos = hook.result.current[2];

        await act( async () => {
            await getCargos();
        })
        
        const [cargos, fetchState] = hook.result.current;

        expect(cargos).toEqual(mockCargos.data.data)
        expect(fetchState).toEqual(FetchState.SUCCESS)

    })

});