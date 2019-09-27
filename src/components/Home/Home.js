import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <article className="helvetica pb5">
                <header className="vh-100 bg-light-blue dt w-100">
                    <div 
                        className="dtc v-mid cover ph3 ph4-m ph5-l">
                        <h1 className="f2 f-subheadline-l measure lh-title fw9">Chore. Get that sh*t done already.</h1>
                    </div>
                </header>
                <div className="serif ph3 ph4-m ph5-l">
                    <p className="lh-copy f5 f3-m f1-l measure center">
                    Create a group, choose what needs to be done, and have accountablity.
                    </p>                    
                    <div className="f5 f3-m lh-copy">
                        <div className="cf dt-l w-100 bt b--black-10 pv4">
                            <div className="dtc-l v-mid mw6 pr3-l">
                                <img className="w-100" src="https://www.bannerhealth.com/healthcareblog/-/media/images/project/blog/images/household-products.ashx?w=1170&hash=0432392A9AB20D4CB1F23F4B4A00CB5CF7ADA0E7" alt=""/>
                            </div>
                            <div className="dtc-l v-mid f6 f5-m f4-l measure-l">
                                <p className="measure pv4-l center">
                                <span className="fw9 fw4-ns">
                                    Roommates, kids, coworkers... they sometimes need a lil nudge</span> to get assignments done. 
                                    Chore helps remind everyone what needs to be done and when. Choose who does what or let us assign the chores.
                                    Everyone gets rated so you know who is ontop of their sh*t. 
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="dtc-l v-mid f5-m f4-l measure tc"><NavLink className="f4 link dim ph4 pv3 mb3 dib white bg-dark-blue center" to='/register'>Get Started</NavLink></div>    
                </div>
            </article>
      </div>
    )
}

export default withRouter(Home);