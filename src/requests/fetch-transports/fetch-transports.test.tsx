import {useFetchTransports} from "./fetch-transports"
import {renderHook, act} from '@testing-library/react-hooks'
import { FetchState } from "../../interfaces";
import axios from "axios";
import { API_URL } from "../../global-vars";
import faker from 'faker'


describe('fetching cargos hook', () =>{
    const renderCustomHook = () => renderHook(() => useFetchTransports());

    it("should return initual value", () => {
        const hook = renderCustomHook();
        const [transports, fetchState, getTransports] = hook.result.current;

        expect(transports).toEqual([]);
        expect(fetchState).toBe(FetchState.DEFAULT);
        expect(typeof getTransports).toBe('function');
    })


    it('should have expected endpoint on api call', async () => {
        const axiosGetSpy = jest.spyOn(axios, 'get').mockResolvedValue({data: []})

        const hook = renderCustomHook();
        const getTransports = hook.result.current[2];

        await act( async () => {
            await getTransports();
        })
        

        expect(axiosGetSpy).toBeCalledTimes(1);
        expect(axiosGetSpy).toBeCalledWith(`${API_URL}/transports`)
    })

    it('should have expected states on api call', async () =>{
        jest.spyOn(axios, 'get').mockResolvedValue({data: []})

        const hook = renderCustomHook();
        const getTransports = hook.result.current[2];

        // We don't want to await for act because it will set state to SUCESS
        // What we want to do to test if fetch state is being set to LOADING before
        // request is resolved
        const promiseAct = act( async () => {
            await getTransports();
        })
        
        const [transports, fetchState] = hook.result.current;

        expect(transports).toEqual([])
        expect(fetchState).toBe(FetchState.LOADING)

        // Now we await to make compiler happy and to avoid unexpected behavior
        await promiseAct;
    });

    it('should have expected states on api error', async () => {
        jest.spyOn(axios, 'get').mockRejectedValue({})

        const hook = renderCustomHook();
        const getTransports = hook.result.current[2];

        await act( async () => {
            await getTransports();
        })
        
        const [transports, fetchState] = hook.result.current;

        expect(transports).toEqual([])
        expect(fetchState).toEqual(FetchState.ERROR)

    })


    it('should have expected states on api sucess', async () => {
        const mockTransports = {
            data: {data: [
                {
                    _id: faker.datatype.number(),
                    name: faker.datatype.string(),
                    from_: faker.datatype.string(),
                    to_: faker.datatype.string(),
                    cargo: faker.datatype.number(),
                    total: faker.datatype.number(),
                    state: faker.datatype.string(),
                    added: faker.datatype.string(),
                    lastmodified: faker.datatype.string(),
                    drivers: [1 ,2],
                    statuses: [
                        {
                            _id: faker.datatype.number(),
                            transportid: faker.datatype.number(),
                            state: faker.datatype.string(),
                            begginingofstate: faker.datatype.string(),
                            endofstate: faker.datatype.string(),
                            duration: faker.datatype.string(),
                            remaining: faker.datatype.number(),
                            eta: faker.datatype.string(),
                            coordinates: [124.53 , 42141421.46324]
                        }
                    ]       
                },
            ],
        }};

        jest.spyOn(axios, 'get').mockResolvedValue(mockTransports)

        const hook = renderCustomHook();
        const getTransports = hook.result.current[2];

        await act( async () => {
            await getTransports();
        })
        
        const [transports, fetchState] = hook.result.current;

        expect(transports).toEqual(mockTransports.data.data)
        expect(fetchState).toEqual(FetchState.SUCCESS)
    })

});