// CPCS 324 Algorithms & Data Structures 2
// Outline - Priority queue data structure
// 2018, Dr. Muhammad Al-Hashimi


// -----------------------------------------------------------------------
// Basic design decisions and implementation planning (objects & interfaces)

// initial requirements: to quickly support Dijkstra and second Prim's algorithms, 
// implement minimum priority functionality

// design decisions:
// Reuse the 324 linked list implementation
// how will the PQ ops be implemented?
// PQ operations will be implemented based on linked list
// this involves manipulating linked list directly from the PQ 

// code plan: start to write your API specifications (JSDOC comments) and think about 
// design consequences (design impact)

// Impact analysis:
// poor object-oriented principles.
// bad in long-term decision
// but it has a quick implement and we need this property



// -----------------------------------------------------------------------
// Priority queue object constructor (document using JSDOC comments)

/**
 * @constructor
 * @description to create a PQ object
 * 
 */
function PQueue()
{
	    /**#@+
		 * @description PROPERTY ;
		 */

		/** Head pointer @private */
	this.pq = new List();          // requirement: linked-list implementation

	     /**#@- */

	
	// specify (design) methods
	    /**#@+
		 * @description MEMBER METHOD ;
		 */

		 /** return true if queue empty */
	this.isEmpty = PQEmpty;                   
	     /** remove/return item with minimum priority */
	this.deleteMin = deleteMinImp;  
	     /** insert an item with priority */          
	this.insert = insertPQ;
	     /** update item priority (decrease as defined in textbook) */                   
	this.decrease = decreaseImp;             
	
}

// -----------------------------------------------------------------------
// Priority queue node constructor (document using JSDOC comments)
/**
 * @constructor
 * @description to defining item in priority queue
 * @param item 
 * @param key 
 * @author Salwa Saeed
 */
function PQNode(item, key)
{
	    /**#@+
		 * @description PROPERTY ;
		 */

	    /** the item */
	this.item = item;
	    /** the priority filed (store the queue based on it) */
	this.prior = key;

	    /**#@- */
	    
	
	// specify (design) methods
	
}

// -----------------------------------------------------------------------
// functions used by PQueue() object methods
// specify interface information (JSDOC comments)
// function names should not clash with linklist.js and queue.js
// .... 

/**
 * @description checking if the queue is empty.
 * @returns {boolean} 
 * @author Salwa Saeed
 */
function PQEmpty()
{
	return this.pq.isEmpty();
}

/**
 * @description to insert an item object(item and its key) in the queue depending on its priority(key) 
 * @param item 
 * @param key 
 * @author Salwa Saeed
 */
function insertPQ(item, key)
{
    // creat one object that contain the item and its key
    /*var item = {
	vertName: item,
	path: key
};*/

    var Item = new PQNode(item,key);
    // create a node in linked list with the item 
	var insertItem = new LNode(Item);
	//pointer refer to the queue (first element in the queue)
	var pointer = this.pq.first;
	
	// if the queue is empty
    if (this.isEmpty())
    {
        this.pq.insert(Item); //insert the item in the queue
    }
	
	// else if the appropraite place of the item is in the beginning
	else if (pointer.item.prior > Item.prior)
	{
    insertItem.next = pointer; //let the item refer to the pointer(which refer to the first element in the queue)
    this.pq.first = insertItem; //let the first element be the item we just insert it

    }

	// otherwise 
	else
    { 
		//walk on the queue to find the appropraite place for the item 
        while (pointer.next != null)
        {
			// if we found its place
             if (pointer.next.item.prior > Item.prior)
                break;//break
        
        pointer = pointer.next;
        }

    insertItem.next = pointer.next; //let the item refer to the next item (which greter then him)
    pointer.next = insertItem; //let the previous element(which is smaller then the item) refr to the item.
    }

}


/**
 * @description to decrease a key(path) for a specific item  
 * @param {*} itemX 
 * @param {*} pathX 
 * @author Salwa Saeed
 */
function decreaseImp(itemX , pathX)
{
	//pointer refer to the queue
	var pointer2 = this.pq.first;
	//pointer help in save thie queue to be closed(since we cannot delete except deleting from the beginning)
	var helperPQ;

	//while we don't reach to the end of the queue
	while(pointer2!=null)
	{
		// if we found the element we want to decrease its key	
		if(itemX == pointer2.item.item)
		{
			// if the new new key is smaller than old key
			if(pathX < pointer2.item.prior)
	    	  pointer2.item.prior = pathX; // assign the new smaller key to the item
			
			// if the itme that we want to update its key was in the first element 
			if(pointer2.item.item == this.pq.first.item.item)
			{
				var upItem = this.deleteMin();// delete it 
				this.insert(upItem.item, upItem.prior); //reinsert it in the queue (since we update the key and the queue is priority queue)
			}
			else
			{
				helperPQ.next = pointer2.next; // second pointer will refer to the next element in the queue (to be the first element in case it will be the item we want and then we can delete it by deleteMin())
			    this.insert(pointer2.item.item, pointer2.item.prior); // reinsert the first element (since we make the second pointer refer to the next element)
            
            }

			break;					

		}
		helperPQ = pointer2;
		pointer2=pointer2.next;
		
	}

}


/**
 * @description deleting the minimum item (which is the first item since the smallest path(key) = highest priority)
 * @returns {boolean}
 * @author Salwa Saeed
 */
function deleteMinImp()
{
    // if the queue is not empty
   if (!this.isEmpty())
	   return this.pq.delete_first(); // delete the first element (using delete_first() method in the linked-list)
}
