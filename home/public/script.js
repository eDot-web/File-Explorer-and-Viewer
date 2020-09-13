const children = $('tbody').children();

let children_array = [];
for(let i=0; i < children.length; i++){
    children_array.push(children[i]);
}

const items = [];

children_array.forEach(element => {
    console.log(element.outerHTML);
    console.log(element.getAttribute('data-name'));
    const rowDetails = {
        name: element.getAttribute('data-name'),
        size: parseInt(element.getAttribute('data-size')),
        time: parseInt(element.getAttribute('data-time')),
        html: element.outerHTML
    };
    items.push(rowDetails);
});


//Sort status
const sortStatus = {
    name: 'none', //none, up, down
    size: 'none', //none, up, down
    time: 'none' //none, up, down
};

const sort = (items, option, type) => {
    items.sort((item1, item2) => {
        let value1, value2;
        if(type === 'name'){
            value1 = item1.name.toUpperCase();
            value2 = item2.name.toUpperCase();
        }else if(type === 'size'){
            value1 = item1.size;
            value2 = item2.size;
        }else{
            value1 = item1.time;
            value2 = item2.time;
        }
        if(value1 < value2){
            return -1;
        }
        if(value1 > value2){
            return 1;
        }
        //equal values
        return 0;
    });

    //reverse the array if the option is down
    if(option === 'down'){
        items.reverse();
    }
};

//fill table body with items
const fill_table_body = items => {
    const content = items.map(element => element.html).join('');
    console.log(content);
    $('tbody').html(content);
};

//event listeners
document.getElementById('table_head_row').addEventListener('click', event =>{
    if(event.target){
        //clear icons
        $('svg').remove();

        if(['none', 'down'].includes(sortStatus[event.target.id])){
            //sort in ascending order
            sort(items, 'up', event.target.id);
            sortStatus[event.target.id] = 'up';
            //add icon
            event.target.innerHTML += `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-10.646.354a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 6.207V11a.5.5 0 0 1-1 0V6.207L5.354 8.354z"/>
          </svg>`;
        }
        else if(sortStatus[event.target.id] === 'up'){
            //sort in descending order
            sort(items, 'down', event.target.id);
            sortStatus[event.target.id] = 'down';
            //add icon
            event.target.innerHTML += `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 5a.5.5 0 0 0-1 0v4.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V5z"/>
          </svg>`;
        }
        fill_table_body(items);
    }
});

