import React, { lazy, Suspense } from 'react';

interface TabsLoaderProps {
    filePath: string
}

const TabsLoader = ({filePath}: TabsLoaderProps) => {

    const Content = lazy(() => import(`../../${filePath}`))

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Content/>
        </Suspense>
    );
};

export default TabsLoader;