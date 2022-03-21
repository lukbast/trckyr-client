interface Iid {
    _id: number
}

export function removeData<T extends Iid>(id : number, data: T[] ){
    const cleanedData = []
    let i = 0
    for (i; i < id;  i++){
        cleanedData.push(data[i])
    }
    i ++;
    for (i; i < data.length;  i++){
        const shiftedObject = data[i]
        shiftedObject._id = i - 1
        cleanedData.push(shiftedObject)
    }

    return cleanedData
}