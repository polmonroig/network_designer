/**
 * This is a PriorityQueue implementation, specifically
 * a min heap to topologically sort the node call order
 *
 * */

class MinHeap{

    constructor(){
        this.heap = [];
        this.size = 0;
    }

    push(x){
        this.size++;
        if(this.size === 1){
            this.heap.push(null);
            this.heap.push(x);
        }
        else{
            self.heap.push(x);
            this.insert_element(this.size);
        }
    }

    top(){
        return this.heap[0];
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
        let newPos = Math.floor(pos / 2);
        if(newPos > 0 && this.heap[newPos].getValue() > this.heap[pos].getValue()){
            // swap values
            let aux = this.heap[newPos];
            this.heap[newPos] = this.heap[pos];
            this.heap[pos] = aux;
            this.insert_element(newPos);
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