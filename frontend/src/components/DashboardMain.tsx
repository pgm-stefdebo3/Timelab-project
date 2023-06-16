import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import LayersIcon from '@mui/icons-material/Layers';
import HomeIcon from '@mui/icons-material/Home';
import MarkerIcon from '@mui/icons-material/Room';
import { ConditionalLoader } from "./ConditionalLoader";

export interface DashboardMainProps {
  children: React.ReactNode;
  active: string;
}

export const DashboardMain = ({ children, active }: DashboardMainProps) => {
    
    const pages = ['dashboard', 'layers', 'markers']

  return (
    <div className="dashboard-main-container">
        <div className="dashboard-main">
            <div className="dashboard-main-navigation">
                <List
                    sx={{
                        pt: 0,
                        height: 'max-content'
                    }}
                >
                {pages.map((name) => (
                    <ListItem key={name} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        href={`/${name}`}
                        sx={{
                        minHeight: 48,
                        maxHeight: 48,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: active === name? '#1976d2': '',
                        px: 2.5,
                        py: 5,
                        "&:hover": {
                            backgroundColor: active === name? '#1976d2': '',
                        }
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <ConditionalLoader condition={'dashboard' === name} >
                            <HomeIcon 
                                sx={{
                                    fill: active === name? '#000000': '',
                                }}
                            />
                        </ConditionalLoader>
                        <ConditionalLoader condition={'layers' === name} >
                            <LayersIcon 
                                sx={{
                                    fill: active === name? '#000000': '',
                                }}
                            />
                        </ConditionalLoader>
                        <ConditionalLoader condition={'markers' === name} >
                            <MarkerIcon 
                                sx={{
                                    fill: active === name? '#000000': '',
                                }}
                            />
                        </ConditionalLoader>
                        </ListItemIcon>
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
            </div>
            <div className="dashboard-main-content">
                {children}
            </div>
        </div>
    </div>
  );
};