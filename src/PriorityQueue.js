/**
 * This is a PriorityQueue implementation, specifically
 * a min heap to topologically sort the node call order
 *
 * */

class MinHeap{

    constructor(){
        this.heap = [null];
        this.size = 0;
    }

    push(x){
        this.size++;
        this.heap.push(x);
        if(this.size > 1){
            this.insert_element(this.size);
        }
    }

    top(){
        return this.heap[1];
    }

    remove_element(pos){
        let element = this.heap[pos];
        while(2 * pos <= this.size){
            let child = 2 * pos;
            if(child !== this.size && this.heap[child].getValue() > this.heap[child + 1].getValue()){
                child++;
            }
            if(element.getValue() > this.heap[child].getValue()){
                this.heap[pos] = this.heap[child];
            }
            else{
                break;
            }
            pos = child;
        }
        this.heap[pos] = element;
    }


    insert_element(pos){
        let parent = Math.floor(pos / 2);

        while(pos > 1 && this.heap[pos].getValue() < this.heap[parent].getValue()){
            // swap parent with son
            [this.heap[pos], this.heap[parent]] = [this.heap[parent], this.heap[pos]];
            // update values
            pos = parent;
            parent = Math.floor(pos / 2);
        }
    }

    pop(x){
        if(this.empty())throw  "Heap is empty";
        this.heap[1] = this.heap[this.size];
        this.size--;
        this.remove_element(1);
        this.heap.splice(this.size - 1, 1);

    }

    empty(){
        return this.size === 0;
    }

}