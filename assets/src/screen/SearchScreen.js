import React, { useRef, useState } from "react";
import { StyleSheet, View, Image, FlatList, ActivityIndicator } from "react-native";
import { pixaApi } from "../api/pixaapi";
import { useQuery } from "@tanstack/react-query";

const SearchScreen = () => {
    const [page, setPage] = useState(1);
    const imageList = useRef([]);
    const { status, error, data, isFetching } = useQuery({
        queryKey: ["posts", { page }],
        queryFn: () => pixaApi(page),
    })

    if (status === "success") {
        imageList.current = [...imageList.current, ...data?.hits];
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={imageList.current}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                    return (
                        <View style={{ margin: 40 }}>
                            <Image source={{ uri: item.previewURL }}
                                style={{ width: 200, height: 200 }} />
                        </View>
                    );
                }}
                onEndReached={() => {
                    setPage(page + 1);
                }}
            />
            {isFetching ? <ActivityIndicator size={"large"} /> : null}
        </View>
    );
}

const style = StyleSheet.create({

});

export default SearchScreen;