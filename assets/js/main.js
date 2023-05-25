/**
* Template Name: Arsha - v4.7.1
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });
  var budgetController = (function(){
    var Expense = function(id, description, value){
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
    };

    Expense.prototype.calculatePercentage = function(totalIncome){
        if(totalIncome > 0){
          this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
          this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function(){
      return this.percentage;
    }

    var Income = function(id, description, value){
      this.id = id;
      this.description = description;
      this.value = value;
    };

    var calculateTotal = function(type){
      var sum = 0;                   
      data.allItems[type].forEach(function(cur){
        sum += cur.value;
      });
      data.totals[type] = sum;
    };

//data structure ready to receive data
    var data = {
      allItems: {
        exp: [],
        inc: []
      },
      totals: {
        exp: 0,
        inc: 0
      },
      budget: 0,
      percentage: -1//non exist
    };

    return {
        addItem: function(type, des, val){//method that takes in type, description and value of our input
            var newItem, ID;

            //create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
              ID = 0;
            }
            //create new item based on 'income' or 'expense' type
            if(type === 'exp') {
              newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
              newItem = new Income(ID, des, val);
            }
            //after we have a new item, we push it in our data structure
            data.allItems[type].push(newItem);//type is exp or inc, which are the same in our data structure, then push interval
            //return the new element
            return newItem;
        },

        deleteItem: function(type, id){
          var ids, index;
            //loop over all the elements in an inc or expense array
            ids = data.allItems[type].map(function(current){//map returns a brand new array
              return current.id;
            });
            //return index
            index = ids.indexOf(id);//returns the index number of the element of the array we input here
            //delete item from array now:
            if (index !== -1){//if index is diff from -1 delete
              data.allItems[type].splice(index, 1);//1st argument is the index we wamt to delete, 2nd is the number of elements we want to delete which is 1
            }

        },

        calculateBudget: function(){

          //1. calculate the budget
          calculateTotal('exp');
          calculateTotal('inc');

          //2. calculate the budget: income - expenses
          data.budget = data.totals.inc - data.totals.exp;

          //3.calculate the percentage of income that we spent
          if(data.totals.inc > 0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
          } else {
            data.percentage = -1;
          }
        },

        calculatePercentages: function(){
          data.allItems.exp.forEach(function(cur){
            cur.calculatePercentage(data.totals.inc);//calculate the percentage for each expense we have in our object
          });
        },

        getPercentages: function(){
          var allPerc = data.allItems.exp.map(function(cur){//
            return cur.getPercentage();
          });
          return allPerc;
        },

        getBudget: function(){
           return {
             budget: data.budget,
             totalInc: data.totals.inc,
             totalExp: data.totals.exp,
             percentage: data.percentage
           }
        },

        testing: function(){
          console.log(data);
        }
    };

})();

//UI Controller
var UIController = (function(){
      //central place where all strings are stored, we can then retrieve them and change them
      var Domstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLable: '.budget__income--value',
        expensesLable: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLable: '.item__percentage',
        dateLabel: '.budget__title--month'
      
      };

      var formatNumber = function(num, type){
        var numSplit, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2);//method of the number prototype - always put exactly 2 deci on the number

        numSplit = num.split('.')//devide the num that we input into 2 parts, integer and decimal and stored in an array

        int = numSplit[0];
        if(int.length > 3) {
          int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);//start a pos 0 and read 3 num - to get 1,000
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
      };

      var nodeListForEach = function(list, callback){
        for (var i = 0; i < list.length; i++){
          callback(list[i], i);
        }
      };

      return {
        getInput: function(){
          return {
            //3 input values stored as parameters
            type: document.querySelector(Domstrings.inputType).value,//read the value,income or expens
            description: document.querySelector(Domstrings.inputDescription).value,
            value: parseFloat(document.querySelector(Domstrings.inputValue).value)
          };
        },

        addListItem: function(obj, type){
            //create html string with placeholder text
            var html, newHTML, element;

            if (type === 'inc') {
              element = Domstrings.incomeContainer;
              html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div> </div>'
            } else if (type === 'exp') {
              element = Domstrings.expensesContainer;
              html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            //replace the placeholder text with some actual Data
            newHTML = html.replace('%id', obj.id);//searches for a string and replaces that string with data we put into that method
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

            //insert the html in the dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        deleteListItem: function(selectorID){//which will be the entireID, so we can delete the item
          var el = document.getElementById(selectorID);
          el.parentNode.removeChild(el);//move up in the dom by traversing with the parentNode method, then remove the child elememt
        },

        clearFields: function(){
          var fields, fieldsArr ;

          fields = document.querySelectorAll(Domstrings.inputDescription + ' ,' + Domstrings.inputValue);

          fieldsArr = Array.prototype.slice.call(fields)//trick slice method into thinking we give it an array

          fieldsArr.forEach(function(current, index, array){//loops through all of the elements of field arr
            current.value = "";//sets the value of all of them to an empty string
          });

          fieldsArr[0].focus();//goes right back to description field
        },

        displayBudget: function(obj){

            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(Domstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(Domstrings.incomeLable).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(Domstrings.expensesLable).textContent = formatNumber(obj.totalExp, 'exp');
            document.querySelector(Domstrings.percentageLabel).textContent = obj.percentage;

            if (obj.percentage > 0 ){
              document.querySelector(Domstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
              document.querySelector(Domstrings.percentageLabel).textContent = '----';

            }
        },

        displayPercentages: function(percentages){

            var fields = document.querySelectorAll(Domstrings.expensesPercLable);

        nodeListForEach(fields, function(current,index){
            if (percentages[index] > 0){
              current.textContent = percentages[index] + '%';//1st element we want 1 perc, at 2nd element we want 2nd perc
            } else {
              current.textContent = '---';//1st element we want 1 perc, at 2nd element we want 2nd perc
            }
         });

        },

        displayMonth: function() {
            var now, year, months, month;

            now = new Date();//store the date of the day in the now var

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
             'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();

            year = now.getFullYear();//this obj now inherets a bunch of method from the date prototype - return our current year
            //change content to our year
            document.querySelector(Domstrings.dateLabel).textContent = months[month] + ' ' +year;
        },

        changedType: function() {
            //select all 3 elements that receive the red-focus class
            var fields = document.querySelectorAll(
              Domstrings.inputType + ',' +
              Domstrings.inputDescription + ',' +
              Domstrings.inputValue);

            nodeListForEach(fields, function(cur){
              //then receive the botton with red class
              cur.classList.toggle('red-focus');//adds red focus when its not there, and when its there removes it.
            });
            document.querySelector(Domstrings.inputBtn).classList.toggle('red');//toggle button when we switch type
        },

        getDomstrings: function(){
          //exposing Domstrings into the public
            return Domstrings;
        }
      };
  })();

//Global App Controller
var controller = (function(budegetCtrl, UICtrl){

      var setupEventListeners = function(){

          var Dom = UICtrl.getDomstrings();//now inside of this Dom var, we also have the Domstrings, since we exposed them publicly
          document.querySelector(Dom.inputBtn).addEventListener('click', ctrlAddItem);
          document.addEventListener('keypress', function(event){
              if(event.keyCode === 13 || event.which === 13){//return key
                ctrlAddItem();
            }
        });

        document.querySelector(Dom.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(Dom.inputType).addEventListener('change', UICtrl.changedType);
      };

      var updateBudget = function(){
        //1. calculate the budget
        budegetCtrl.calculateBudget();
        //2. return budget
        var budget = budegetCtrl.getBudget();
        //3. display the budget on the UI
        UICtrl.displayBudget(budget);
      }

      var updatePercentages = function(){
        //1.calculate the percentages
        budegetCtrl.calculatePercentages();
        //2.read percentages from the budget Controller
        var percentages = budegetCtrl.getPercentages();
        //3.update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
      }

      var ctrlAddItem = function(){
        var input, newItem;
        //1. get the field input Data
        input = UICtrl.getInput();

        //input description should not be empty, and the number should not be (not a number) AND value should always be greater than 0
        if (input.description !== "" && !isNaN(input.value) && input.value > 0){
          //2. add item to the budget Controller
          newItem = budegetCtrl.addItem(input.type, input.description, input.value);

          //3. add the item to the UI
          UICtrl.addListItem(newItem, input.type);

          //4. clear the fields
          UICtrl.clearFields();

          //5.calculate and update budget
          updateBudget();

          //6. calculate and update the updatePercentages
          updatePercentages();
        }
      };

      var ctrlDeleteItem = function(event){
          var itemID, splitID, type, ID;
          itemID = (event.target.parentNode.parentNode.parentNode.parentNode.id);//element where event was fired, returns an html node in the DOM

          if (itemID) {
            //all the ingredients to delete the item from our UI and data Controller
            splitID = itemID.split('-');//allows us to break up a string into diff parts, convert to array
            type = splitID[0];//inc or exp are the types
            ID = parseInt(splitID[1]);//id, second element, convert string to integer

            //1.delete the item from the data structure
            budegetCtrl.deleteItem(type, ID);
            //2.delete the tiem from UI
            UICtrl.deleteListItem(itemID);
            //3. update and show the new budget
            updateBudget();
            //4. calculate and update the updatePercentages
            updatePercentages();
          }
      }

      return {
        init: function(){
          console.log('app has started');
          UICtrl.displayMonth();
          UICtrl.displayBudget({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: -1
          });//everything reset to 0
          setupEventListeners();
        }
      };
})(budgetController, UIController);

controller.init();

})()