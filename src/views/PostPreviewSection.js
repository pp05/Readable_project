import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchPosts, fetchCategories} from '../actions';
import PreviewPost from './PreviewPost'
//import Button from 'react-toolbox/lib/button/Button';
//import IconButton from 'react-toolbox/lib/button/IconButton';
import sortBy from 'sort-by'
import { Button } from 'semantic-ui-react';
import { List } from 'semantic-ui-react'
//import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
class PostPreviewSection extends Component {

	sortBy = {
		TIME : {field : 'timestamp', label:'Sort By Time'},
		VOTES : {field: 'voteScore', label:'Vote Score'}
	}
	state = {
		categorySelected :this.props.categorySelected,
		sortBy: this.sortBy.TIME.field,
		sortOrder: ''
	}

  componentWillMount () {
  	//this.props.fetchCategories();
    this.props.fetchPosts();    
  }
  sortButtonClicked = (sortBy) =>{
  	//if the same button is clicked change the sorting order
  	if(sortBy == this.state.sortBy)
  	{
  		var sortOrder = this.state.sortOrder == '-' ? '':'-';
  		this.setState({sortOrder:sortOrder});
  	}
  	else{
  		this.setState({sortBy:sortBy});
  	}
  }

	getButtonJSX =(sortByObj) => {
		if(this.state.sortBy == sortByObj.field){
		return <Button icon={this.state.sortOrder == '-' ? 'arrow_drop_down': 'arrow_drop_up'} 
			  				content={sortByObj.label}
			  				 raised accent
			  				 onClick={() => this.sortButtonClicked(sortByObj.field)} />
		}
		else{
			return <Button icon={this.state.sortOrder == '-' ? 'arrow_drop_down': 'arrow_drop_up'} 
			  				content={sortByObj.label}
			  				 raised neutral
			  				 onClick={() => this.sortButtonClicked(sortByObj.field)} />
		}
	}	

	render(){
		const {posts} = this.props ;
		//sort the posts using the sortby api
		posts.sort(sortBy(this.state.sortOrder + this.state.sortBy));
		console.log('PostPreviewSection rerendered');
		return (		
			<div>
			 <List divided relaxed>
			 	
			  {Object.values(this.sortBy).map((sortByObj) => {
			  		return this.getButtonJSX(sortByObj)
			  	 })
			   }
			 	
              {posts.map((post)=>(              	
              		<PreviewPost postId={post.id}/>)) 
              }
            </List>
            </div>
			)
	}

}
/**
	mapStateToProps recieves the state and whatever is set here is set as the props for
	current component ie. PostPreviewSection. connect method below binds this
**/
function mapStateToProps(state){
	return {
		posts: (Object.values(state.postsById)).filter(
				(post)=>{
					if(state.setCategory.category == 'All_Categories')
						return post;
					else
					return post.category == state.setCategory.category}),
		categorySelected : state.setCategory.category
	}
}

/**
The below allows PostPreviewSection to call this.fetchPosts instead of having to call
this.props.dispatch(actioncreatorname)
**/
function mapDispatchToProps(dispatch){
	return{
		fetchPosts : () => {
			console.log('I am in fetchPosts')
			dispatch(fetchPosts())}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostPreviewSection)
