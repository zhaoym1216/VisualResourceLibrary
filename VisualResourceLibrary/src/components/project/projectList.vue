<style scoped>
        [v-cloak] {
            display: none;
        }
        .picscreen {
            position: relative;
        }

        .picbg {
            background-image: url("../../assets/images/projectlist_1.jpg");
            background-size: cover;
            position: absolute;
            height: 100px;
            width: 100%;
            background-color: #8b8b8b;
            top: -15px;
            left: 0;
        }

        .pictitle {
            font-size: 1.4rem;
            font-family: Georgia, sans-serif, serif;
        }

        .picdesc {
            font-size: 0.9rem;
            display: block;
        }

        .picTag {
            margin-right: 30px;
            background-color: #608ebded;
            color: white;
            padding: 5px;
            cursor: pointer;
            /*border: 1px solid #e8eaec;*/
            border-radius: 4px;
        }

        .project-input {
            margin-top: 20px;
            margin-bottom: 10px;
            margin-left: 5%;
            width: 400px;
        }

        .search-btn {
            margin-top: 20px;
            margin-bottom: 10px;
            margin-left: 20px;
            font-size: 0.5rem;
            width: 100px;
            background-color: rgba(21, 88, 145, 0.8);
            color: rgba(255, 255, 255, 1);
        }

        .project-start-btn {
            margin-top: 20px;
            margin-bottom: 10px;
            right: 20px;
            position: absolute;
            font-size: 0.5rem;
            border-radius: 6px;
            width: 150px;
            background-color: rgba(21, 88, 145, 0.8);
            color: rgba(255, 255, 255, 1);
            text-align: center;
        }

        /*Tabs--style*/
        .tabs {
            min-height: 500px;
            border-top: 1px solid lightgrey;
        }

        .tabpane-syle {
            font-size: 20px;
            background-color: rgba(133, 115, 92, 0.1);
            min-height: 500px;
        }

        .ivu-tabs-bar {
            /*border-bottom: 1px solid #dddee1;*/
            margin-bottom: 0px;
        }

        .ivu-tabs-nav-wrap {
            text-align: center;
            margin-bottom: 0px;
        }

        .ivu-tabs-nav-scroll {
            margin-left: 5%;
        }

        .ivu-tabs-tab {
            font-size: 16px;
            font-weight: bold;
        }

        .ivu-row {
            margin-bottom: 45px;
        }

        .pro-page {
            bottom: 75px;
            left: 43%;
            font-size: 14px;
            text-align: center;
            margin-bottom: 10px;
        }

        .pro-content {
            margin-top: 100px;
        }
        img {
            width: 100%;
            height: auto;
        }

        .projectTitle {
            height: 16px;
            line-height: 15px;
            font-size: 16px;
            max-width: 150px;
            padding-left: 5px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .cardicon {
            height: 15px;
            align-items: center;
            display: flex;
            justify-content: flex-start;
            margin-top: 10px
        }
</style>

<template>
  <div id="vueBody" v-cloak style="min-width: 1100px;">
      
    <i-input class="project-input" placeholder="Enter projects name..." v-model="searchText" @keyup.enter.native="showPageList"></i-input>
    <i-button class="search-btn" @click="showPageList">Search</i-button>
    <i-button class="project-start-btn" @click="newProject" type="default">Establish a project</i-button>
    <div class="tabs">
        <Row :style="{minHeight:contentMinHeight+'px'}">
            <i-col>
                <div class="pro-tab">
                    <Tabs v-model="currentTab" @on-click="changeTab" style="margin-left:70px;">
                        <tab-pane label="All" name="All" icon="md-list"></tab-pane>
                        <tab-pane label="Investigational" name="Investigational" icon="md-globe"></tab-pane>
                        <tab-pane label="Intercomparable" name="Intercomparable" icon="md-git-compare"></tab-pane>
                        <tab-pane label="Reproducible" name="Reproducible" icon="ios-copy"></tab-pane>
                        <tab-pane label="Educational" name="Educational" icon="ios-paper"></tab-pane>
                    </Tabs>
                </div>
                <div class="picscreen">
<!--                    <div class="picbg"></div>-->
                    <div class="picbg">
                        <div style="height: inherit;display: flex;justify-content: center;flex-direction: column">
                            <div style="margin-left: 100px;">
                                <span class="pictitle">{{selectCatalog.name}}</span>
                                <span class="picdesc">{{selectCatalog.introduction}}</span>
                            </div>
                            <div style="margin-top:10px; margin-left: 100px">
                                <span class="picTag" v-for="tag in selectCatalog.tags" :key="tag.index" :id="tag" @click=filtTags(tag)>{{tag}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pro-content">
                    <div v-if="projectList!=undefined && projectList.length > 0">
                        <div class="projectCard" v-for="(item) in projectList" :key="item.index"
                            style="width:95%;margin-right:5%">
                            <i-col :xs="{ span: 5, offset: 1 }"
                                :md="{ span:5, offset: 1 }"
                                :lg="{ span: 3, offset: 1}">
                                <div @click="projectInfoModalShow(item)" style="cursor:pointer">
                                    <Card style="height:auto;margin:15px -15px">
                                        <!-- title-->
                                        <span slot="title" class="projectTitle" :title="item.name">{{item.name}}</span>

                                        <!-- 右上角的button-->
                                        <div class="operate" slot="extra" style="display:flex;align-items:center">
                                            <Icon type="md-eye" :size="20" title="Public project"
                                                v-show="!(item.isManager||item.isMember) && (item.privacy=='Public')"></Icon>
                                            <Icon type="md-lock" :size="20" title="Discoverable project"
                                                v-show="!(item.isManager||item.isMember) && (item.privacy=='Discoverable')"></Icon>
                                            <br/>
                                            <Icon type="md-person" :size="20" title="Managed or joined project"
                                                v-show="item.isMember||item.isManager" :id="item.aid"></Icon>
                                        </div>
                                        <!--  description-->
                                        <div style="display:flex;align-items:center;height:20px">
                                            <strong style="text-align: center">Description</strong>
                                            <p style="padding: 0 10px;word-break:break-word;overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 400px;"
                                            :title="item.description">
                                                {{item.description}}
                                            </p>
                                        </div>
                                        <!-- avatar-->
                                        <div style="height:200px;display:flex;justify-content:center;margin-top:10px">
                                            <img :src="item.picture" v-if="item.picture!=''&&item.picture!='undefined'"/>
                                            <avatar :username="item.name" :size="200" :title="item.name" :rounded="false"
                                                    v-else></avatar>
                                        </div>
                                        <!--managername -->
                                        <!--                            <div  class="cardicon"  >-->
                                        <!--                                <Icon type="md-body" :size="15" Manager></Icon>-->
                                        <!--                                <span style="height:20px;margin-left:5%">-->
                                        <!--                                <strong>{{item.managerName}}</strong>-->
                                        <!--                            </span>-->
                                        <!--                            </div>-->
                                        <!--time-->
                                        <div class="cardicon">
                                            <Icon type="md-clock" :size="15" Time></Icon>
                                            <span style="height:20px;margin-left:5%">
                                            <strong>{{item.createdTime.split(' ')[0]}}</strong>
                                        </span>
                                        </div>
                                        <!--tag -->
                                        <div class="cardicon">
                                            <Icon type="md-pricetags" :size="15" Tags></Icon>
                                            <strong style=" margin-left:5%; display: inline-block; overflow: hidden;  white-space: nowrap; text-overflow: ellipsis;">
                                                {{item.tag}}
                                            </strong>
                                        </div>
                                    </Card>
                                </div>
                            </i-col>
                        </div>
                    </div>
                    <div v-else>
                        <i-col span="22" offset="1">
                            <Card :bordered="false" style="min-height: 350px; margin-top: 3%">
                                <div style="display:flex;justify-content:center">
                                    <Icon type="md-alert" size="40" color="gray"></Icon>
                                </div>
                                <br/>
                                <div style="display:flex;justify-content:center;">
                                    <h2 style="text-align:center;width:50%">No more projects in this category.</h2>
                                </div>
                                <br/>
                                <div style="display:flex;justify-content:center">
                                    <h4 style="text-align:center;width:50%;color:lightblue">
                                        You can click the button right top to add a new project.
                                        <br/>Enriching your description of the project and attracting more people to join in.
                                    </h4>
                                </div>
                            </Card>
                        </i-col>
                    </div>
                </div>
            </i-col>
        </Row>
        <div class="pro-page">
            <Page ref="pages" :total="totalCount" :page-size="pageSize" :current="currentPage" size="small"
                  @on-change="changePage" show-elevator show-total></Page>
        </div>
        <div th:replace="navigation::commonFooter"></div>
        </div>
    </div>
</template>
<script>
import Avatar from "vue-avatar";

export default {
  data() {
    return {
            projectList:[
                {
                    aid:"131e2ec5-a09f-4892-ae02-02c94e9d0e63",
                    name:"workplace test",
                    description:"123",
                    purpose:"Data visualization",
                    creator:"0743e9c0-6f02-411c-8b5c-0fcdccaf2eaf",
                    members:[{"role":"manager","userId":"0743e9c0-6f02-411c-8b5c-0fcdccaf2eaf"},{"role":"expert","userId":"01422e09-9fe3-40ea-a777-5aa6d7c0a696"}],
                    type:"Activity_Group",
                    parent:null,
                    children:["31344a34-18fa-4e72-978c-a8ed8d25df59","fd9b0114-5016-4417-bf3a-a73dafa95b76","220c1ed9-8297-465c-9b7f-5ea467237a12","c4dc1e23-f965-45df-b1ad-cff1e20ffae8"],
                    permission:"{\"observe\":{\"manager\":null,\"coreteam\":null,\"widerteam\":null,\"visitor\":\"No\"},\"auto_join\":{\"manager\":null,\"coreteam\":null,\"widerteam\":null,\"visitor\":\"No\"},\"edit_info\":{\"manager\":true,\"coreteam\":true,\"widerteam\":true,\"visitor\":null},\"invite_member\":{\"manager\":true,\"coreteam\":true,\"widerteam\":true,\"visitor\":null},\"manage_member\":{\"manager\":true,\"coreteam\":false,\"widerteam\":false,\"visitor\":null},\"create_task\":{\"manager\":true,\"coreteam\":false,\"widerteam\":true,\"visitor\":null},\"manage_task\":{\"manager\":true,\"coreteam\":false,\"widerteam\":true,\"visitor\":null},\"upload_resource\":{\"manager\":true,\"coreteam\":true,\"widerteam\":true,\"visitor\":null},\"use_resource\":{\"manager\":true,\"coreteam\":true,\"widerteam\":true,\"visitor\":null},\"manage_resource\":{\"manager\":true,\"coreteam\":false,\"widerteam\":true,\"visitor\":null},\"manage_workspace_type\":{\"manager\":true,\"coreteam\":false,\"widerteam\":true,\"visitor\":null},\"import_tool\":{\"manager\":true,\"coreteam\":true,\"widerteam\":false,\"visitor\":null},\"use_tool\":{\"manager\":true,\"coreteam\":true,\"widerteam\":true,\"visitor\":null},\"manage_tool\":{\"manager\":true,\"coreteam\":false,\"widerteam\":false,\"visitor\":null},\"manage_child_activity\":{\"manager\":true,\"coreteam\":false,\"widerteam\":true,\"visitor\":null}}",
                    level:0,
                    createdTime:"2021-08-09 10:18:34",
                    activeTime:"2021-10-30 14:18:04",
                    toolList:null,
                    privacy:"Public",
                    tag:"GIS \u0026 RS,Human,workplace",
                    picture:"",
                    category:"Educational"
                },
                {
                    aid:"131e2ec5-a09f-4892-ae02-02c94e9d0e63",
                    name:"地图学",
                    description:"地图学课程21级01班",
                    purpose:"Data visualization",
                    creator:"0743e9c0-6f02-411c-8b5c-0fcdccaf2eaf",
                    members:[{"role":"manager","userId":"0743e9c0-6f02-411c-8b5c-0fcdccaf2eaf"},{"role":"expert","userId":"01422e09-9fe3-40ea-a777-5aa6d7c0a696"}],
                    type:"Activity_Group",
                    parent:null,
                    children:["31344a34-18fa-4e72-978c-a8ed8d25df59","fd9b0114-5016-4417-bf3a-a73dafa95b76","220c1ed9-8297-465c-9b7f-5ea467237a12","c4dc1e23-f965-45df-b1ad-cff1e20ffae8"],
                    permission:"{\"observe\":{\"manager\":null,\"coreteam\":null,\"widerteam\":null,\"visitor\":\"No\"},\"auto_join\":{\"manager\":null,\"coreteam\":null,\"widerteam\":null,\"visitor\":\"No\"},\"edit_info\":{\"manager\":true,\"coreteam\":true,\"widerteam\":true,\"visitor\":null},\"invite_member\":{\"manager\":true,\"coreteam\":true,\"widerteam\":true,\"visitor\":null},\"manage_member\":{\"manager\":true,\"coreteam\":false,\"widerteam\":false,\"visitor\":null},\"create_task\":{\"manager\":true,\"coreteam\":false,\"widerteam\":true,\"visitor\":null},\"manage_task\":{\"manager\":true,\"coreteam\":false,\"widerteam\":true,\"visitor\":null},\"upload_resource\":{\"manager\":true,\"coreteam\":true,\"widerteam\":true,\"visitor\":null},\"use_resource\":{\"manager\":true,\"coreteam\":true,\"widerteam\":true,\"visitor\":null},\"manage_resource\":{\"manager\":true,\"coreteam\":false,\"widerteam\":true,\"visitor\":null},\"manage_workspace_type\":{\"manager\":true,\"coreteam\":false,\"widerteam\":true,\"visitor\":null},\"import_tool\":{\"manager\":true,\"coreteam\":true,\"widerteam\":false,\"visitor\":null},\"use_tool\":{\"manager\":true,\"coreteam\":true,\"widerteam\":true,\"visitor\":null},\"manage_tool\":{\"manager\":true,\"coreteam\":false,\"widerteam\":false,\"visitor\":null},\"manage_child_activity\":{\"manager\":true,\"coreteam\":false,\"widerteam\":true,\"visitor\":null}}",
                    level:0,
                    createdTime:"2021-08-09 10:18:34",
                    activeTime:"2021-10-30 14:18:04",
                    toolList:null,
                    privacy:"Public",
                    tag:"GIS \u0026 RS,Human,workplace",
                    picture:"",
                    category:"Educational"
                },
            ],
        currentProjectList: this.projectList,
        projectType: [],
        currentTab: "All",
        //初始化信息总条数
        //projectCount:10,
        contentMinHeight: 0,
        currentPage: 1,
        totalCount: this.count,
        //每页显示多少条
        pageSize: 18,
        tabPageData: this.projectList,
        tabPaneType: [{label: "All", name: "All", icon: "icon ion-md-list"},
            {label: "Investigational", name: "Investigational", icon: "icon ion-md-globe"},
            {label: "Intercomparable", name: "Intercomparable", icon: "icon ion-md-git-compare"},
            {label: "Reproducible", name: "Reproducible", icon: "icon ion-ios-copy"},
            {label: "Educational", name: "Educational", icon: "icon ion-ios-paper"}
        ],
        projectCatalog: [
            {
                name: "All projects",
                introduction: "All different types of are listed here, including investigational projects, intercomparable projects, reproducible projects, and educational projects. Select the project that you need.",
                tags:[]
            },
            {
                name: "Investigational projects",
                introduction: "Understanding geographic scales and boundaries, clarifying geographic elements, analyzing geographic phenomena, and simulating geographic processes.",
                tags:["Terrestrial","Coastal", "Marine","Climate","Ecological","Geological", "Human", "GIS & RS", "General"]
            },
            {
                name: "Intercomparable projects",
                introduction: "Participatory Intercomparison (PIC) projects can be conducted in an open, configurable and reproducible manner.",
                tags:[]
            },
            {name: "Reproducible projects", introduction: "Reproducible projects",tags:[]},
            {name: "Educational projects", introduction: "Educational projects",tags:[]},
        ],
        selectCatalog: {
            name: "All projects",
            introduction: "All different types of are listed here, including investigational projects, intercomparable projects, reproducible projects, and educational projects. Select the project that you need.",
            tags:[]
        },
        // user
        userInfo: [],
        userState: false,
        freshEle: 0,
        searchText:"",
        selectTag: ""
    };
  },
  components:{
	Avatar,
  },
  created() {
      var userInfo = {
            userState: false,
            userName: 'Visitor',
            userId: '',
            avatar: ''
        };
        // sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        // $.ajax({
        //     url: "/GeoProblemSolving/user/state",
        //     type: "POST",
        //     async: false,
        //     success: data => {
        //         if (data) {
        //             data.userState = true;
        //             sessionStorage.setItem('userInfo', JSON.stringify(data));
        //         } else {
        //             console.log("Not logged in");
        //         }
        //     },
        //     error: function (err) {
        //         console.log("Get user info fail.");
        //     }
        // });
  },
  mounted() {
    this.resizeContent();
        //判断用户状态，如果登录，判断project权限，如果否，不判断
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (this.userInfo != null && this.userInfo.userState) {
            this.userState = true;
        }
        else {
            this.userState = false;
            // this.judgeMember(projectsInfo.projectList);
            // this.tabPageData = Object.assign([], projectsInfo.projectList);
            this.freshEle++;
        }
        this.showPageList();
         window.onresize = () => {
            return (() => {
                this.$refs.navigationEl.identityMenuCSS();
                this.resizeContent();
            })()
        }
  },
  methods: {
    resizeContent() {
                    this.contentMinHeight = window.innerHeight - 253;
                },
                changeTab(type) {
                    this.currentTab = type;
                    this.currentPage = 1;
                    this.$nextTick(function () {
                        this.$refs['pages'].currentPage = 1;
                    });
                    if(this.selectTag !== ""){
                        document.getElementById(this.selectTag).style.backgroundColor="#608ebded";
                        this.selectTag = "";
                    }

                    if (type == "All" && !this.userState) {
                        // this.judgeMember(projectsInfo.projectList);
                        // this.tabPageData = Object.assign([], this.currentProjectList);
                        this.freshEle++;
                        // this.totalCount = projectsInfo.count;
                    }
                    this.showPageList();
                    if (type == "All") {
                        this.selectCatalog = this.projectCatalog[0];
                    }
                    else if (type == "Investigational") {
                        this.selectCatalog = this.projectCatalog[1];
                    }
                    else if (type == "Intercomparable") {
                        this.selectCatalog = this.projectCatalog[2];
                    }
                    else if (type == "Reproducible") {
                        this.selectCatalog = this.projectCatalog[3];
                    }
                    else if (type == "Educational") {
                        this.selectCatalog = this.projectCatalog[4];
                    }
                },
                filtTags(tagName, obj) {
                    if (this.selectTag == tagName) {
                        this.selectTag = "";
                        this.tabPageData = Object.assign([], this.currentProjectList);
                        document.getElementById(tagName).style.backgroundColor="#608ebded";
                    }
                    else {
                        if(this.selectTag != ""){
                            document.getElementById(this.selectTag).style.backgroundColor="#608ebded";
                            this.selectTag = "";
                        }

                        document.getElementById(tagName).style.backgroundColor="#12bd67b8";
                        this.selectTag = tagName;
                        // this.tabPageData = this.currentProjectList.filter(project => {

                        //     if (project.tag.indexOf(tagName) != -1) {
                        //         return true;
                        //     }
                        //     return false;
                        // });
                    }
                    this.showPageList();
                },
                changePage(index){
                    this.currentPage = index;
                    this.showPageList();
                },
                showPageList() {
                        axios
                            .get("/GeoProblemSolving/project" +
                                "?category=" + this.currentTab +
                                "&tag=" + this.selectTag +
                                "&page=" + this.currentPage +
                                "&userId=" + this.userInfo.userId +
                                "&pageSize=" + this.pageSize +
                                "&keyword=" + this.searchText )
                            .then(res => {
                                // this.$Spin.hide();
                                if (res.data.code == 0 || res.data.code == -1) {
                                    if (res.data.code == -1) {
                                        this.currentProjectList = [];
                                    }
                                    else {
                                        this.judgeMember(res.data.data.projectList);
                                    }
                                    this.tabPageData = Object.assign([], this.currentProjectList);
                                    this.totalCount = res.data.data.count;
                                    this.freshEle++;
                                }
                                else {
                                    console.log(res.data.msg);
                                }
                            })
                            .catch(err => {
                                console.log(err.data);
                            });
                    // }
                },

                judgeMember(projectList) {
                    //判断登录状态
                    if (this.userState) {
                        if (projectList.length !== 0) {
                            for (var i = 0; i < projectList.length; i++) {
                                let members = projectList[i].members;
                                    for (var j = 0; j < members.length; j++) {
                                    if (members[j].userId === this.userInfo.userId) {
                                        projectList[i]["isMember"] = true;
                                        projectList[i]["isManager"] = members[j].role === "manager";
                                        break;
                                    } else {
                                        projectList[i]["isMember"] = false;
                                    }
                                }
                            }
                            this.currentProjectList = Object.assign([], projectList);
                        }
                        else {
                            this.currentProjectList = [];
                        }
                    }
                    else {
                        if (projectList.length !== 0) {
                            for (let i = 0; i < projectList.length; i++) {
                                projectList[i]["isManager"] = false;
                                projectList[i]["isMember"] = false;
                            }
                            this.currentProjectList = Object.assign([], projectList);
                        }
                        else {
                            this.currentProjectList = [];
                        }
                    }
                },
                newProject() {
                    if (this.userState == false) {
                        window.location.href = "/GeoProblemSolving/login"
                    } else {
                        window.location.href = "/GeoProblemSolving/newProject"
                    }
                },
                sendMessage(data) {
                    //父子组件传值，然后使用refs调用导航栏中内容
                    this.$refs.navigationEl.sendMessage(data);
                }
  }
};
</script>
