// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class StyleGuide extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
					<h1>Heading 1</h1>
					<h2>Heading 2</h2>
					<h3>Heading 3</h3>
					<p>Body bro... dat girls a dime piece. Body bro... dat girls a dime piece. Body bro... dat girls a dime piece. Body bro... dat girls a dime piece.</p>

					<small>Small text for descriptions and shit</small><br />
					<small className="grass">Small text for descriptions and shit</small><br />
					<small className="fire">Small text for descriptions and shit</small><br />
					<small className="ice">Small text for descriptions and shit</small><br />
					<small className="honey">Small text for descriptions and shit</small>

					<ul>
						<li>Unordered list item 1</li>
						<li>Unordered list item 2</li>
					</ul>

					<ol>
						<li>Ordered list item 1</li>
						<li>Ordered list item 2</li>
					</ol>


				<hr />
        </div>
				<div className="col-xs-3">
					<h3>Inputs</h3>
					<input type="text" name="" placeholder="Placeholder" /><br />
					<input type="text" className="fire" placeholder="Err" /><br />
					<input type="text" className="grass" placeholder="Success" /><br />
					<input type="text" placeholder="Placeholder" value="Value" /><br />
					<input type="text" placeholder="Disabled" disabled /><br />
				</div>
				<div className="col-xs-3">
					<h3>Text Areas</h3>
					<textarea>Text area</textarea><br />
					<textarea className="fire">Error</textarea><br />
					<textarea className="grass">Success</textarea><br />
				</div>
				<div className="col-xs-3">
					<h3>Labels</h3>
					<label>Default</label>
					<label className="ice">Ice</label>
					<label className="stone">Stone</label>
					<label className="grass">Grass</label>
					<label className="fire">Fire</label>
					<label className="honey">Honey</label><br />
					<div className="numberDot">1</div> <span className="title">Some title of a section</span><br />
					<div className="numberDot">2</div> <span className="title">Another section</span><br />
					<div className="numberDot">3</div> <span className="title">Last section</span>

					<h3>Icons</h3>
					<i className="material-icons">pets</i>
					<i className="material-icons md-16">keyboard_arrow_down</i>
					<i className="material-icons">done</i>
					<i className="material-icons">search</i>
					<i className="material-icons">error_outline</i>
					<i className="material-icons">timeline</i>
					<br /><br />
					<a href="http://google.github.io/material-design-icons/#icon-font-for-the-web">Styling icons</a> |
					<a href="https://material.io/icons/">List of icons</a>
				</div>
				<div className="col-xs-3">
					<h3>Buttons</h3>
					<button>Default</button>
					<button className="fire">Fire</button>
					<button className="ice">Ice</button>
					<button className="honey">Honey</button>
					<button className="grass">Grass</button>
					<button className="stone">Stone</button>
					<button disabled>Disabled</button>

					<h3>Dropdown</h3>
					<div className="dropdown">
					  <button>Dropdown <i className="material-icons md-14">keyboard_arrow_down</i></button>
					  <div className="dropdown-content">
					    <a href="#">Last Seen</a>
					    <a href="#">First Seen</a>
					    <a href="#">Email</a>
					  </div>
					</div>

				</div>
				<hr />

				<div className="col-xs-12">
					<h3>Tables</h3>

					<table>
            <thead>
              <tr>
                <th><input type="checkbox" name="" value="" /></th>
                <th>Person</th>
                <th>Company</th>
                <th>Path Score</th>
                <th>Created</th>
                <th>Last Seen</th>
                <th>Location</th>
                <th>Actions</th>
                <th>Activity</th>
              </tr>
            </thead>
					  <tbody>
              <tr>
                <td><input type="checkbox" name="" value="" /></td>
                <td>
                  <img className="userIcon" src="img/userIcon.jpg" />
                  <div className="tablePerson">
                  <span className="name">Peter</span><br /><small>Their Title</small>
                  </div>
                </td>
                <td>Company 1</td>
                <td>15 Dec 2016</td>
                <td>1348</td>
                <td><label className="grass">Today</label></td>
                <td>Prosper, TX</td>
                <td><button className="ice">View</button> | <div className="dropdown">
              <button>Actions <i className="material-icons md-14">keyboard_arrow_down</i></button>
              <div className="dropdown-content">
                <a href="#">Edit</a>
                <a href="#">Assign to</a>
                <a href="#">Delete</a>
              </div>
            </div></td>
              <td><i className="material-icons">timeline</i></td>
              </tr>
            </tbody>
					</table>


				</div>
	  	</div>
    );
  }
}
