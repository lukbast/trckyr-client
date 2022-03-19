import { ICargoData } from "../../interfaces";

function swap(items:ICargoData[], leftIndex:number, rightIndex:number){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items:ICargoData[], left:number, right:number, key:"_id" | "name") {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i][key] < pivot[key]) {
            i++;
        }
        while (items[j][key] > pivot[key]) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

export function quickSort(items: ICargoData[], left:number, right:number, key:"_id" | "name") {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right, key); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1, key);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right, key);
        }
    }
    return items;
}
