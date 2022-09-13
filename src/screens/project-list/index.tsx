import { List } from "./list";
import { SearchPanel } from "./search-panel";
import React, { useState, useEffect } from "react";
import { cleanObject, useDebounce, useMount } from "utils";

import * as qs from "qs";
import { useHttp } from "utils/http";

// 使用JS大部分的错误都是在runtime（运行时）的时候发现的
// 在静态代码中，就能找到其中的一些错误 -> 强类型
const apiUrl = process.env.REACT_APP_API_URL;

// axios 和 fetch表现不一样， axios可以直接在返回状态不为2xx的时候抛出异常
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 500);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
