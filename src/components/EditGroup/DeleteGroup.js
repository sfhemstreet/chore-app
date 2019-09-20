import React from 'react';
import BackButton from '../form_components/BackButton';

const DeleteGroup = ({close, submit}) => {
    return (
        <div className='center mw6-ns br3 hidden mv4'>
            <h2 className="black  mv0 pv2 ph3 tc">Sure You Want to Delete This Group?</h2>
            <div className="pa3 bt b--black-10">
                <fieldset className="ba b--transparent ph0 mh0 flex">
                    <BackButton click={close} />
                    <div className="f6 link br2 ph3 pv2 mb2 dib white bg-blue grow pointer" onClick={submit}>Yes, Delete This Group</div>
                </fieldset>
            </div>
        </div>
    )
}

export default DeleteGroup;