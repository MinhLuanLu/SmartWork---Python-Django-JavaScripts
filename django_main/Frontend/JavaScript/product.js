    
    
    let items_in_cart_total = 0; //add total items in cart

    let sort_sække_total_items_list = 0;
    let spandepose_total_items_list = 0;
    let toiletpapir_tork_items_list = 0;
    let toiletpapir_items_list = 0;
    let handsker_items_list = 0;
    let blå_klud_items_list = 0;
    let rød_klud_item_list = 0;
    let frjebakke_kost_items_list = 0;

    order_list = [];

    
    document.getElementById('logout').addEventListener('click', function(){
            sessionStorage.clear();
        })

   
    const role = sessionStorage.getItem('user_role');
    if(role == 'Manager'){
        document.getElementById('checkIn_nav').style.display = 'none';
        document.getElementById('confirm').style.display = 'inline-block';
    }

    

    document.getElementById('order-btn_sort_sække').addEventListener('click', function(){
        let get_sort_sække_total = document.getElementById('sort_sække_total').value;
        if (get_sort_sække_total > 0){

            total = items_in_cart_total+1; /// Add Item to the cart
            items_in_cart_total = total;

            total_items = sort_sække_total_items_list + parseInt(get_sort_sække_total); //add total items of Sort_sække
            sort_sække_total_items_list = total_items;
 

            document.getElementById('items_in_cart').innerText = total;
            document.getElementById('sort_sække_total').value = '0';
          
        }
        else{
            alert('Please choose items total')
        }
        
      
    })

    document.getElementById('order-btn_spandepose').addEventListener('click', function(){
        let get_spandepose_total = document.getElementById('spandepose_total').value;
        if (get_spandepose_total > 0){

            total = items_in_cart_total +1;
            items_in_cart_total = total;

            total_items = spandepose_total_items_list + parseInt(get_spandepose_total); //add total items of Spandepose
            spandepose_total_items_list = total_items;
            
      
            spandepose_total = get_spandepose_total;
            document.getElementById('items_in_cart').innerText = total;
            document.getElementById('sort_sække_total').value = '0';
            
        }
        else{
            alert('Please choose items total')
        }
        
    })
    
    document.getElementById('order-btn_toiletpapir_tork').addEventListener('click', function(){
        let get_toiletpapir_tork = document.getElementById('toiletpapir_tork_total').value;
        
        if (get_toiletpapir_tork > 0){
            total = items_in_cart_total+1;
            items_in_cart_total = total;

            total_items = toiletpapir_tork_items_list + parseInt(get_toiletpapir_tork);
            toiletpapir_tork_items_list = total_items;

            document.getElementById('items_in_cart').innerText = total;
            document.getElementById('toiletpapir_tork_total').value = '0';
        }
        else{
            alert('Please choose items total')
        }
        
    })
    

    document.getElementById('order-btn_toiletpapir').addEventListener('click', function(){
        let get_toiletpapir = document.getElementById('toiletpapir_total').value;
        document.getElementById('items_in_cart').value = '';
        
        
        if (get_toiletpapir > 0){
            total = items_in_cart_total+1;
            items_in_cart_total = total;

            total_items = toiletpapir_items_list + parseInt(get_toiletpapir);
            toiletpapir_items_list = total_items;


            document.getElementById('items_in_cart').innerText = total;
            document.getElementById('toiletpapir_total').value = '0';
        }
        else{
            alert('Please choose items total')
        }
        
    })

    document.getElementById('order-btn_handsker').addEventListener('click', function(){
        let get_handsker = document.getElementById('handsker_total').value;
        
        if (get_handsker > 0){
            total = items_in_cart_total+1;
            items_in_cart_total = total;

            total_items = handsker_items_list + parseInt(get_handsker);
            handsker_items_list = total_items;


            document.getElementById('items_in_cart').innerText = total;
            document.getElementById('handsker_total').value = '0';
        }
        else{
            alert('Please choose items total')
        }
        
    })

    document.getElementById('order-btn_blå_klud').addEventListener('click', function(){
        let get_blå_klud = document.getElementById('blå_klud_total').value;
        

        if (get_blå_klud > 0){
            total = items_in_cart_total+1;
            items_in_cart_total = total;

            total_items = blå_klud_items_list + parseInt(get_blå_klud);
            blå_klud_items_list = total_items;

            document.getElementById('items_in_cart').innerText = total;
            document.getElementById('blå_klud_total').value = '0';
        }
        else{
            alert('Please choose items total')
        }
        
    })
    
    document.getElementById('order-btn_rød_klud').addEventListener('click', function(){
        let get_rød_klud = document.getElementById('blå_klud_total').value;
        
        if (get_rød_klud > 0){
            total = items_in_cart_total+1;
            items_in_cart_total = total;

            total_items = rød_klud_item_list + parseInt(get_rød_klud);
            rød_klud_item_list = total_items;

            document.getElementById('items_in_cart').innerText = total;
            document.getElementById('blå_klud_total').value = '0';
        }
        else{
            alert('Please choose items total')
        }
        
    })
    
    document.getElementById('order-btn_frjebakke/kost').addEventListener('click', function(){
        let get_frjebakke_kost = document.getElementById('frjebakke/kost_total').value;
        
        
        if (get_frjebakke_kost > 0){
            total = items_in_cart_total+1;
            items_in_cart_total = total;

            total_items = frjebakke_kost_items_list + parseInt(get_frjebakke_kost);
            frjebakke_kost_items_list = total_items;

            document.getElementById('items_in_cart').innerText = total;
            document.getElementById('frjebakke/kost_total').value = '0';
        }
        else{
            alert('Please choose items total')
        }
        
    })

    document.getElementById('order-btn').addEventListener('click', function(){
     
        const order_info = document.getElementById('order_info');
    
        order_info.innerText = '';  // Clear previous content

      
        const order_list = [
            {name: 'Sort Sække', count: sort_sække_total_items_list},
            {name: 'Spandepose', count: spandepose_total_items_list},
            {name: 'Toiletpapir Tork', count: toiletpapir_tork_items_list},
            {name: 'Toiletpapir', count: toiletpapir_items_list},
            {name: 'Handsker', count: handsker_items_list},
            {name: 'Blå Klud', count: blå_klud_items_list},
            {name: 'Rød Klud', count: rød_klud_item_list},
            {name: 'Frjebakke Kost', count: frjebakke_kost_items_list},
        ];
        
        order_list.forEach(item => {
            if (item.count > 0) {
                let paragraph = document.createElement('p'); // create the new element
                paragraph.innerText = `${item.name}: ${item.count}`;
                order_info.appendChild(paragraph);
                
                document.getElementById("confirm_order").style.display = 'inline-block';
                
                
            }
        });
        
        if(items_in_cart_total == 0){
            alert('Cart is emty');
        }    

    })

    document.getElementById('cancel-btn').addEventListener('click',function(){
        document.getElementById("confirm_order").style.display = 'none';
    })

    document.getElementById('confirm-btn').addEventListener('click',function(){
        alert('order Confirm');
        document.getElementById("confirm_order").style.display = 'none';
    })