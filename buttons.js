function buttonClick(id){
  button = document.getElementById(id);
  let color_default = 'rgb(102, 98, 109)';
  let colot_checked = 'RoyalBlue';
  if(id ==='cmd_start'){
    if (check_cmd_start === true){
      check_cmd_start = false;
      button.style.backgroundColor= color_default;
    }else{
      check_cmd_start = true;
      //button.style.backgroundColor= color_checked;
      check_cmd_end = false;
      let b = document.getElementById('cmd_start');
      b.style.backgroundColor= color_default;
    }
  }else if(id ==='cmd_end'){
    if (check_cmd_end === true){
      check_cmd_end = false;
      check_cmd_start = false;
      button.style.backgroundColor= color_default;
    }else{
      check_cmd_end = true;
      check_cmd_start = false;
      //button.style.backgroundColor= color_checked;
      //check_cmd_start = false;
      //let b = document.getElementById('cmd_end');
      //b.style.backgroundColor= color_default;
    }
  }else if(id ==='cmd_new'){
    if (check_cmd_home === true){
      check_cmd_home = false;
      button.style.backgroundColor= color_default;
      location.reload();
    }else{
      check_cmd_home = true;
      //button.style.backgroundColor= color_checked;
    }
  }
}