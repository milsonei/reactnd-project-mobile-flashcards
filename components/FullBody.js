import React from 'react'
import { Grid, Row, Col } from 'native-base'
import PropTypes from 'prop-types'
/**
 * Allows you to centralize an element vertically in the Content Component
 * @param {any} props 
 */
const FullBody = (props) => {
    const { children } = props
    return (<Grid >
                <Row style={{height:"100%"}}>
                    <Col>
                        {children}
                    </Col>
                </Row>
            </Grid>)
}

FullBody.propTypes = {
    children: PropTypes.any 
}

export default FullBody