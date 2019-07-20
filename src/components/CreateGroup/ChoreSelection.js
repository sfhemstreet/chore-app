import React from 'react';

const ChoreSelection = ({choreChange,goForward,goBack}) => {
    

    
    return (
        <div>
            <div id="choreSelection" class="hide">
				<h4 >Select Chores</h4>
				<p>Click a chore to add it to your list. Or write it in the box below!</p>
				<div id="choreSelectionForm" class="">
					<select id="choreSelectionList" name="" size="7">
					  	<option value='choreName'>Wipe surfaces</option>
						<option value='choreName'>Clean Windows</option>
						<option value='choreName'>Vacuum Floor</option>
						<option value='choreName'>Sweep Floor</option>
						<option value='choreName'>Mop Floor</option>
						<option value='choreName'>Wash Dishes</option>
						<option value='choreName'>Cook Meal</option>
						<option value='choreName'>Grocery Shopping</option>
						<option value='choreName'>Do Laundry</option>
						<option value='choreName'>Wash Bedding</option>
						<option value='choreName'>Clean Bathroom</option>
						<option value='choreName'>Scrub Toilet</option>
						<option value='choreName'>Scrub Sink</option>
						<option value='choreName'>Scrub Tub</option>
						<option value='choreName'>Scrub Shower Stall</option>
						<option value='choreName'>Organize Shelves</option>
						<option value='choreName'>Clean Kitchen</option>
						<option value='choreName'>Clean Fridge</option>
						<option value='choreName'>Clean Oven</option>
						<option value='choreName'>Clean Stove</option>
						<option value='choreName'>Organize Pantry</option>
						<option value='choreName'>Water Indoor Plants</option>
						<option value='choreName'>Water Garden Plants</option>
						<option value='choreName'>Take Out Trash</option>
						<option value='choreName'>Walk Dog</option>
						<option value='choreName'>Feed Dog</option>
						<option value='choreName'>Feed Cat</option>
						<option value='choreName'>Feed Fish</option>
						<option value='choreName'>Change Cat Litter</option>
						<option value='choreName'>Clean Fish Tank</option>
						<option value='choreName'>Clean Driveway</option>
						<option value='choreName'>Clean Deck</option>
						<option value='choreName'>Pull Weed</option>
						<option value='choreName'>Mow Lawn</option>
						<option value='choreName'>Rake leaves</option>
						<option value='choreName'>Shovel Snow</option>
						<option value='choreName'>Clean Fireplace</option>
						<option value='choreName'>Clean Gutter</option>
						<option value='choreName'>Wash Car</option>
					</select>
				</div>
				<div >
					<label >
						<input  type="text" class="" placeholder="Custom Chore" pattern='[A-Za-z0-9\s]{2,18}'></input>
					</label>
					<input onClick value="Add"></input>
				</div>
            </div>
            <div >
				<h5>Chores You Selected Go Here! Click to remove a chore</h5>
					<div id="preChoreListSection">
						<div id="preChoreListForm" class="">
							<select id="userSelectedChores" name="" size="7" class="">
							</select>
							<input type='reset' value='Back'/>
							<input type="submit" value="Continue"/>
						</div>
					</div>
				</div>
        </div>
        
    )
    
}

export default ChoreSelection;