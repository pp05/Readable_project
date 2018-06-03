import React, { Component } from 'react';
import {connect} from 'react-redux';
//import  ListItem from 'react-toolbox/lib/list/ListItem';
import { List } from 'semantic-ui-react'
import '../../node_modules/react-toolbox/src/components/list/theme.css'
import '../assets/react-toolbox/theme.css';
class PreviewPost extends Component {

	formatDate =(timestamp) => {
		return new Date(timestamp).toLocaleString();
	}

	render (){
		const { category, id, title, author, timestamp } = this.props.post;
  		//Category: [{category}] | Author: {author} | Posted on: {this.formatDate(timestamp)}
		/**return (
			<ListItem  
				caption ={title}
				legend = 'author'
            		
            	> 
            </ListItem>
            )**/
        return(
        	<div>
        		<div>{title}</div>
        		<div>Category: [{category}] | Author: {author} | Posted on: {this.formatDate(timestamp)}</div>
        	</div>
        	)

	}
}

function mapStateToProps(state, ownProps){
	return {
		post: state.postsById[ownProps.postId]
	}
}

export default connect(mapStateToProps)(PreviewPost)