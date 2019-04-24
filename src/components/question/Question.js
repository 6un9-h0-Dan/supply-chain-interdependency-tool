import React, { Component } from 'react';
import { connect } from "react-redux";

import store from '../../redux/store';
import { answerQuestion } from "../../redux/actions";

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    question: {
      display: 'inline-flex',
    },
    formControl: {
      margin: theme.spacing.unit * 3,
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
  });

const mapState = state => ({
    currentType: state.currentType,
    currentItem: state.currentItem
});

class Question extends Component {
    handleChange = event => {
        store.dispatch(
            answerQuestion({
                type: this.props.currentType,
                itemId: this.props.currentItem.ID,
                queId: this.props.question.ID,
                ansInd: event.target.value-1 
            })
        );
    };

    render() {
        if (this.props.question == null){
            return <div className={"question"}>No question was passed to the component.</div>
        }

        let response = 0;
        if (this.props.hasOwnProperty("response")){
            if (typeof(this.props.response) !== 'undefined'){
                response = parseInt(this.props.response);
                // Have to add then remove 1 from the index because the Select only accepts > 0 values (otherwise sets to blank)
                response += 1;
            }
        }
        return (
            <TableRow>
                <TableCell>
                    <FormLabel component="legend">{this.props.question.Question}</FormLabel>
                </TableCell>
                <TableCell>
                    <FormControl component="fieldset" className="question-form">
                        <Select
                            value={parseInt(response)}
                            onChange={(e) => this.handleChange(e, this.props.question.ID)}
                            inputProps={{
                                name: this.props.question.ID,
                                id: this.props.question.ID,
                            }}
                        >
                            {this.props.question.Answers.map((answer, i) => (
                                <MenuItem key={i} value={i+1}>{answer.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)(connect(mapState)(Question));