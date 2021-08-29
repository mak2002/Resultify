import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles, Paper } from '@material-ui/core'

export default function TypographyLayout({text}) {
    return (
        <div>
                <h4 variant="h6" color="primary">{text}</h4>
        </div>
    )
}
