import { ReactNode, useMemo } from 'react';
import { Box, styled } from '@mui/material';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Props {
    rightItems: ReactNode[];
    leftItems?: ReactNode[];
    verticallyPadded?: boolean;
    small?: boolean;
}

const StyledBox = styled(Box, { shouldForwardProp: (prop) => !['isSmall', 'verticallyPadded', 'hasMultipleItems'].includes(prop as string) })<{ verticallyPadded: boolean, hasMultipleItems: boolean, isSmall: boolean }>(({
                                                                                                                                                                                                                               theme,
                                                                                                                                                                                                                               verticallyPadded,
                                                                                                                                                                                                                               hasMultipleItems,
                                                                                                                                                                                                                               isSmall,
                                                                                                                                                                                                                           }) => ({
    position: 'relative',
    '&:before': {
        position: 'absolute',
        content: '""',
        top: verticallyPadded ? 28 : 8,
        zIndex: 0,
        left: isSmall ? 9 : 11,
        width: '1px',
        height: `calc(100% - ${verticallyPadded ? 28 : 8}px)`,
        border: hasMultipleItems ? `1px dashed ${theme.palette.common.black}` : undefined,
    }
}));

const LeftItemBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 'calc(50% + 4px)',
    left: '-48px',
    transform: 'translateX(-50%)',
    zIndex: 10,
    fontSize: '13px',
    padding: '3px 5px',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '6px',
    '&:after': {
        position: 'absolute',
        content: '""',
        width: '0',
        height: '0',
        borderTop: `6px solid transparent`,
        borderBottom: `6px solid transparent`,
        borderLeft: `6px solid ${theme.palette.primary.main}`,
        zIndex: 100,
        top: '50%',
        transform: 'translateY(-50%)',
        left: '100%',
    }
}));

export function VerticalList({ rightItems, leftItems = [], verticallyPadded = true, small = false }: Props) {
    const hasMultipleItems = useMemo(() => rightItems.length > 1, [rightItems.length]);
    console.log(leftItems)

    return (
        <StyledBox
            hasMultipleItems={hasMultipleItems}
            verticallyPadded={verticallyPadded}
            sx={{ width: '100%' }}
            isSmall={small}
        >
            {rightItems.map((item, i, self) => {
                const isLast = hasMultipleItems && i === self.length - 1;

                return (
                    <Box
                        key={i}
                        sx={{ width: '100%', position: 'relative' }}
                        display="flex"
                        alignItems={verticallyPadded ? 'flex-end' : 'center'}
                        mb={small ? 1.5 : 0}
                    >
                        {!!leftItems[i] && (
                            <LeftItemBox>{leftItems[i]}</LeftItemBox>
                        )}
                        {isLast ? (
                            <Box sx={{ background: '#fff', position: 'relative' }}>
                                <LocationOnIcon
                                    fontSize={small ? 'small' : 'medium'}
                                    color="error"
                                    sx={{
                                        mb: (verticallyPadded && !small) ? 0.5 : 0,
                                        background: '#fff',
                                        position: 'relative'
                                    }}
                                />
                            </Box>
                        ) : (
                            small ? (
                                <PanoramaFishEyeIcon
                                    fontSize={small ? 'small' : 'medium'}
                                    sx={{ mt: 0.5, background: '#fff', position: 'relative' }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        background: '#fff',
                                        position: 'relative',
                                        pt: verticallyPadded ? 0.5 : 0
                                    }}>
                                    <PanoramaFishEyeIcon
                                        fontSize={small ? 'small' : 'medium'}
                                        sx={{ mt: 0.5, background: '#fff', position: 'relative' }}
                                    />
                                </Box>
                            )
                        )}
                        <Box pl={small ? 1.5 : 2.5} sx={{ width: '100%' }}>
                            {item}
                        </Box>
                    </Box>
                );
            })}
        </StyledBox>
    )

    return null;
}
