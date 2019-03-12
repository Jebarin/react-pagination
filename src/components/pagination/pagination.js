import React, {PropTypes} from 'react';
import styles from './pagination.css';

class Pagination extends React.Component{

    render (){   
        return ( 
            <div className={styles.paginationContainer}>
                {this.totalItems >2 && 
                    <ul className="pagination">
                        <li className={`page-item ${this.state.currentPage === 1 ? "disabled" : ""}`}>
                            <a className="page-link " href="#" aria-label="Previous" onClick={()=>this.state.currentPage > 1 && this.loadPrev()}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        {this.state.pages.map((i)=>{
                            return (
                                <li className={`page-item ${this.state.currentPage === i ? "active" : ""}`} key={i}><a className="page-link" href="#" onClick={()=>this.loadPage(i)}>{i}</a></li>
                            )
                        },this) } 
                        <li className={`page-item ${this.state.currentPage === this.totalPages ? "disabled" : ""}`}>
                            <a className="page-link" href="#" aria-label="Next" onClick={()=>this.state.currentPage < this.totalPages && this.loadNext()}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul> 
                }
            </div>
        )
    }

    constructor(props){
        super(props);

        //items limit per page
        this.itemsPerPage = 2;
        //pagination calculations
        this.initPageVariables(this.props);
        //default state values
        this.state = { 
            currentPage: 1,
            pages: this.calculatePages(1)
        }  
    }

    componentDidMount(){  
        //load the initial set of items
        this.loadPage(this.state.currentPage);
    }

    componentWillReceiveProps(newProps){  
        //Before updating pagination make sure there is a change in items 
        if(this.props.items.length !== newProps.items.length){ 
            this.initPageVariables(newProps); 
            const _page = this.totalPages !==0 &&  this.totalPages < this.state.currentPage ? this.totalPages  : this.state.currentPage;
            this.loadPage(_page);
        } 
    }
    
    shouldComponentUpdate(nextProps, nextState){
        //allow updating the component only if items added/removed or page changed
        //this will avoid unwanted calling calls to render function
        if(this.props.items.length !== nextProps.items.length || this.state.currentPage !== nextState.currentPage){ 
            return true;
        }
        return false;
    }

    initPageVariables(_props){
        //get total items
        this.items = _props.items;
        //get the count of total items
        this.totalItems = this.items.length;
        //calculate total page size
        this.totalPages = Math.ceil(this.totalItems/this.itemsPerPage);  
    }

    calculatePages(_cp){
        /**
         * This function calculates the page numbers dynamically
         * @variable {number} btnLimit - Manage the number of buttons to display in UI
         * @variable {number} buffer - Manages the adjacent limit
         * @variable {array} _pages - List of page numbers
         */
        const btnLimit = 5;
        const buffer = 2;
        let _pages = []; 
        [...Array(this.totalPages).keys()].map((i)=>{ 
            //The page starts with 1 so make to increment i value
            const _page = i+1; 
            if(_pages.length < btnLimit && ( _page >= _cp-buffer ||  _page+btnLimit > this.totalPages) ){
                _pages.push(_page); 
            }
            return true;
        },this);
        return _pages; 
    }

    loadPage(_currentPage){   
        //update the pagination state and refresh the content in parent component
        this.setState({
            currentPage: _currentPage,
            pages : this.calculatePages(_currentPage)
        }, ()=>{
            //get items to display
            const _offset = (_currentPage -1)  * this.itemsPerPage || 0;
            const _itemsToShow = this.items.slice(_offset, _offset+this.itemsPerPage);  
            //refresh the parent component 
            this.props.loadPage && this.props.loadPage(_itemsToShow);
        }); 
    }

    loadNext(){ 
        //lod the next page
        this.loadPage(this.state.currentPage+1);
    }

    loadPrev(){ 
        //load the previous page
        this.loadPage(this.state.currentPage-1); 
    }
}

Pagination.PropTypes = {
    items: PropTypes.object.isRequired,
    loadPage: PropTypes.func.isRequired
}

export default Pagination