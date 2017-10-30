
$(function()
{
   /////加载初始网络数据
   $.ajax
        ({
            type:'POST', 
            data:
             {
                region_id:regionId+"",
                user_id:userId,
                action:'index'
             },
             url: SERVER_BASE_URL+"index.php",
             
             beforeSend: function () 
             {
                ////显示加载中。。。。
                  $("#loading_dialog").show();
                 $("#loading_mask").show();
                 $("#loading_text").html('正在加载中...');
             },
             success: function (data) 
             {
                   $("#loading_dialog").hide();
                     $("#loading_mask").hide();
            
                if(data.status == '1')
                {
                    var default_region_name = data.default_region_name;
                    $("#location_city_name").html(default_region_name);
                    //alert(default_region_name);
                    
                    var ad_list = data.ad_list;
                    //alert(ad_list);
                    var ad_list_str = "";
                    
                    var group_menu_list = data.group_menu_list;
                    var group_menu_list_str = "";
                    
                    var mobile_ad_list = data.mobile_ad;
                    var mobile_ad_list_str = "";
                    
                    
                    var index_menu_list = data.index_menu_list;
                    var index_menu_list_str = "";
                    
                     for(var i=0;i<index_menu_list.length;i++)
                     {
                         var menu_name = index_menu_list[i].menu_name;
                         var menu_image = SERVER_ROOT_URL+index_menu_list[i].menu_image;
                         var target_cate_id = index_menu_list[i].target_cate_id;
                         var menu_goods_num = index_menu_list[i].menu_goods_num;
                         var menu_item = index_menu_list[i].menu_item;
                         var target_goods_id = index_menu_list[i].target_goods_id;
                         
                         //img onclick="javascript:window.location.href='<{if $index_menu['cate_id']}>goods_list.php?c=<{$index_menu['target_cate_id']}><{else}>info.php?id=<{$index_menu['target_goods_id']}><{/if}>'
                         index_menu_list_str += 
                         "<div class='content clearfix'><div class='content-cell'><div class='floor'><img src='images/floor02.jpg' /><div class='floor-txt1'>"
                         +(i+1)+"F</div><div class='floor-txt2'>"+menu_name+"</div></div>"
                         +"<img src='"+menu_image+"'/></div><div class='content-cell'>";
                         
                         var menu_item_str = "";
                         
                          for(var j=0;j<menu_item.length;j++)
                          {
                               var item_image = SERVER_ROOT_URL+menu_item[j].item_image;
                               var target_goods_id = menu_item[j].target_goods_id; 
                             
                                 //onclick="javascript:window.location.href='info.php?id=<{$index_menu_item['target_goods_id']}>'"  
                               if( menu_goods_num == '8' && j<4 )
                               {
                                   menu_item_str += "<img src='"+item_image+"'/>";
                               }
                               else if( menu_goods_num == '6' && j<3 )
                               {
                                   menu_item_str += "<img src='"+item_image+"'/>";
                               }
                               else if( menu_goods_num == '4' && j<2 )
                               {
                                   menu_item_str += "<img src='"+item_image+"'/>";
                               }
  
                          }
                          
                           index_menu_list_str += menu_item_str + "</div>  ";
                           
                           var menu_item_str2 = "";
                           for(var j=0;j<menu_item.length;j++)
                          {
                               var item_image = SERVER_ROOT_URL+menu_item[j].item_image;
                               var target_goods_id = menu_item[j].target_goods_id; 
                             
                                 //onclick="javascript:window.location.href='info.php?id=<{$index_menu_item['target_goods_id']}>'"  
                               if( menu_goods_num == '8' && j>3 )
                               {
                                   menu_item_str2 += "<img src='"+item_image+"'/>";
                               }
                               else if( menu_goods_num == '6' && j>2 )
                               {
                                   menu_item_str2 += "<img src='"+item_image+"'/>";
                               }
                               else if( menu_goods_num == '4' && j>1 )
                               {
                                   menu_item_str2 += "<img src='"+item_image+"'/>";
                               }
  
                          }
                          
                           index_menu_list_str += "<div class='content-cell'>"+ menu_item_str2 + "</div></div>";
                           
                           
                           
                            ////////////////////////这里还有  变量名冲突！ ad_list 
                           var menu_ad_list = index_menu_list[i].ad_list;
                              
                          for(var j=0;j<menu_ad_list.length;j++)
                          {
                              /*
                                <div class="banner" ><img src="../<{$ad['ad_image']}>"
                                 onclick="javascript:window.location.href='info.php?id=<{$ad['goods_id']}>'" /></div>
                               * */
                              var ad_image = SERVER_ROOT_URL+menu_ad_list[j].ad_image;
                              index_menu_list_str += 
                              "<div class='banner' ><img src='"+ad_image+"'</div>";
                          }
                          
                     }
                    
                    // alert(index_menu_list_str);
                     
                     
                      $("#index_menu_list_data").html(index_menu_list_str);
                     
                     
                     
                    
                    for(var i=0;i<mobile_ad_list.length;i++)
                    {
                        var ad_image = SERVER_ROOT_URL+mobile_ad_list[i].ad_image;
                        var goods_id = mobile_ad_list[i].goods_id;
                        
                        alert(goods_id);
                         alert(ad_image);
                        
                        //javascript:window.location.href='info.php?id=<{$ad['goods_id']}>'
                        mobile_ad_list_str += "<div class='banner'><img src='"+ad_image+"' onclick='' /></div>";
                    }
                    
                     $("#mobile_ad_list_data").html(mobile_ad_list_str);
                    
                    
                   for(var i=0;i<group_menu_list.length;i++)
                   {
                      var menu_list =  group_menu_list[i];
                      
                      var menu_list_str = ""; 
                      
                      
                      for(var j=0;j<menu_list.length;j++)
                      {
                          var menu_id = menu_list[j].cate_id;
                          var menu_icon = SERVER_ROOT_URL+menu_list[j].cate_icon;
                          var menu_name =  menu_list[j].cate_name; 
                         
                          
                           menu_list_str += 
                          "<li onclick=''><div><img src='"+menu_icon+"' /></div><p>"+menu_name+"</p></li>"; 

                      }
                      
                        group_menu_list_str += " <li><ul class='in-btn'>" +menu_list_str+"</ul></li>";  
                       
                   }
                   
                   $("#group_menu_list_data").html(group_menu_list_str);
                    
                    for(var i=0;i<ad_list.length;i++)
                    {
                       
                       var cate_id = ad_list[i].cate_id;
                       var target_tc_id = ad_list[i].target_tc_id; 
                       var target_id = ad_list[i].target_id; 
                       var ad_image = ad_list[i].ad_image; 
                       
                       var adhref = "";
                       
                       if(cate_id)
                       {
                           adhref = "goods_list.php?c="+cate_id;
                       }
                       else if(target_tc_id)
                       {
                            adhref = "tc_info.php?id="+target_tc_id;
                       }
                       else if(target_id)
                       {
                            adhref = "info.php?id="+target_id;
                       }
                       //alert(adhref);
                      // alert(SERVER_ROOT_URL+ad_image);
                      ad_image = SERVER_ROOT_URL+ad_image;
                     // alert(ad_image);
                     ad_list_str += "<li><a class='pic' href='"+adhref+"'><img src='"+ad_image+"'/></a></li>";
                       
                    }
                    
                   // alert(ad_list_str); 
                   $("#ad_list_data").html(ad_list_str);
                   
                   //轮播二次构建
                   TouchSlide({slideCell:"#slideBox",titCell:".hd ul",mainCell:".bd ul", effect:"leftLoop", autoPage:true,autoPlay:true});
                    
                }
                
             },
             error:function(data1,data2,data3)
             {
                $("#loading_dialog").hide();
                $("#loading_mask").hide();
                alert("服务器连接失败");
                 
             },
             dataType: "JSON"
        });
   
   //获取购物车上的数量
   
   
});