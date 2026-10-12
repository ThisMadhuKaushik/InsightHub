--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2026-10-12 11:45:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 24840)
-- Name: activity_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_logs (
    id bigint NOT NULL,
    organization_id bigint NOT NULL,
    user_id bigint,
    project_id bigint,
    task_id bigint,
    action character varying(100) NOT NULL,
    entity_type character varying(50) NOT NULL,
    entity_id bigint,
    metadata jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.activity_logs OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24839)
-- Name: activity_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_logs_id_seq OWNER TO postgres;

--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 225
-- Name: activity_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_logs_id_seq OWNED BY public.activity_logs.id;


--
-- TOC entry 224 (class 1259 OID 16648)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    task_id bigint NOT NULL,
    user_id bigint NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16647)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 223
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 215 (class 1259 OID 16513)
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(20),
    industry character varying(100),
    organization_type character varying(50),
    plan character varying(30) DEFAULT 'FREE'::character varying NOT NULL,
    status character varying(20) DEFAULT 'ACTIVE'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT organizations_plan_check CHECK (((plan)::text = ANY ((ARRAY['FREE'::character varying, 'PRO'::character varying, 'ENTERPRISE'::character varying])::text[]))),
    CONSTRAINT organizations_status_check CHECK (((status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'INACTIVE'::character varying, 'SUSPENDED'::character varying])::text[])))
);


ALTER TABLE public.organizations OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16512)
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organizations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organizations_id_seq OWNER TO postgres;

--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 214
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;


--
-- TOC entry 220 (class 1259 OID 16592)
-- Name: project_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_members (
    project_id bigint NOT NULL,
    user_id bigint NOT NULL,
    role character varying(30) DEFAULT 'MEMBER'::character varying,
    joined_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.project_members OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16570)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id bigint NOT NULL,
    organization_id bigint NOT NULL,
    created_by bigint NOT NULL,
    name character varying(150) NOT NULL,
    description text,
    status character varying(20) DEFAULT 'PLANNING'::character varying NOT NULL,
    start_date date,
    due_date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT projects_status_check CHECK (((status)::text = ANY ((ARRAY['PLANNING'::character varying, 'ACTIVE'::character varying, 'ON_HOLD'::character varying, 'COMPLETED'::character varying, 'ARCHIVED'::character varying])::text[])))
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16569)
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO postgres;

--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 218
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- TOC entry 222 (class 1259 OID 16610)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id bigint NOT NULL,
    project_id bigint NOT NULL,
    parent_task_id bigint,
    assigned_to bigint,
    title character varying(150) NOT NULL,
    description text,
    priority character varying(20) DEFAULT 'MEDIUM'::character varying NOT NULL,
    status character varying(20) DEFAULT 'TODO'::character varying NOT NULL,
    start_date date,
    due_date date,
    completed_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tasks_priority_check CHECK (((priority)::text = ANY ((ARRAY['LOW'::character varying, 'MEDIUM'::character varying, 'HIGH'::character varying, 'CRITICAL'::character varying])::text[]))),
    CONSTRAINT tasks_status_check CHECK (((status)::text = ANY ((ARRAY['TODO'::character varying, 'IN_PROGRESS'::character varying, 'IN_REVIEW'::character varying, 'DONE'::character varying, 'BLOCKED'::character varying])::text[])))
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16609)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO postgres;

--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 221
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 217 (class 1259 OID 16532)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    organization_id bigint NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(20),
    role character varying(30) DEFAULT 'EMPLOYEE'::character varying NOT NULL,
    status character varying(20) DEFAULT 'ACTIVE'::character varying NOT NULL,
    last_login timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['OWNER'::character varying, 'ADMIN'::character varying, 'MANAGER'::character varying, 'EMPLOYEE'::character varying, 'VIEWER'::character varying])::text[]))),
    CONSTRAINT users_status_check CHECK (((status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'INACTIVE'::character varying, 'SUSPENDED'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16531)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3226 (class 2604 OID 24843)
-- Name: activity_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs ALTER COLUMN id SET DEFAULT nextval('public.activity_logs_id_seq'::regclass);


--
-- TOC entry 3223 (class 2604 OID 16651)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 3202 (class 2604 OID 16516)
-- Name: organizations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- TOC entry 3212 (class 2604 OID 16573)
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- TOC entry 3218 (class 2604 OID 16613)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- TOC entry 3207 (class 2604 OID 16535)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3263 (class 2606 OID 24848)
-- Name: activity_logs activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 3260 (class 2606 OID 16657)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3236 (class 2606 OID 16530)
-- Name: organizations organizations_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_email_key UNIQUE (email);


--
-- TOC entry 3238 (class 2606 OID 16526)
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- TOC entry 3240 (class 2606 OID 16528)
-- Name: organizations organizations_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_slug_key UNIQUE (slug);


--
-- TOC entry 3252 (class 2606 OID 16598)
-- Name: project_members project_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_members
    ADD CONSTRAINT project_members_pkey PRIMARY KEY (project_id, user_id);


--
-- TOC entry 3249 (class 2606 OID 16581)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 3258 (class 2606 OID 16623)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 16547)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3245 (class 2606 OID 16545)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3264 (class 1259 OID 33031)
-- Name: idx_activity_logs_project_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_logs_project_created ON public.activity_logs USING btree (project_id, created_at DESC);


--
-- TOC entry 3261 (class 1259 OID 33032)
-- Name: idx_comments_task_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_comments_task_created ON public.comments USING btree (task_id, created_at);


--
-- TOC entry 3250 (class 1259 OID 16646)
-- Name: idx_project_members_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_project_members_user ON public.project_members USING btree (user_id);


--
-- TOC entry 3246 (class 1259 OID 16641)
-- Name: idx_projects_creator; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_projects_creator ON public.projects USING btree (created_by);


--
-- TOC entry 3247 (class 1259 OID 16640)
-- Name: idx_projects_organization; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_projects_organization ON public.projects USING btree (organization_id);


--
-- TOC entry 3253 (class 1259 OID 16643)
-- Name: idx_tasks_assigned; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_assigned ON public.tasks USING btree (assigned_to);


--
-- TOC entry 3254 (class 1259 OID 16645)
-- Name: idx_tasks_assigned_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_assigned_status ON public.tasks USING btree (assigned_to, status);


--
-- TOC entry 3255 (class 1259 OID 16642)
-- Name: idx_tasks_project; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_project ON public.tasks USING btree (project_id);


--
-- TOC entry 3256 (class 1259 OID 16644)
-- Name: idx_tasks_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_status ON public.tasks USING btree (status);


--
-- TOC entry 3241 (class 1259 OID 16639)
-- Name: idx_users_organization; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_organization ON public.users USING btree (organization_id);


--
-- TOC entry 3275 (class 2606 OID 24849)
-- Name: activity_logs activity_logs_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- TOC entry 3276 (class 2606 OID 24859)
-- Name: activity_logs activity_logs_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- TOC entry 3277 (class 2606 OID 24864)
-- Name: activity_logs activity_logs_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON DELETE CASCADE;


--
-- TOC entry 3278 (class 2606 OID 24854)
-- Name: activity_logs activity_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3273 (class 2606 OID 16658)
-- Name: comments comments_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON DELETE CASCADE;


--
-- TOC entry 3274 (class 2606 OID 16663)
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3268 (class 2606 OID 16599)
-- Name: project_members project_members_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_members
    ADD CONSTRAINT project_members_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- TOC entry 3269 (class 2606 OID 16604)
-- Name: project_members project_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_members
    ADD CONSTRAINT project_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3266 (class 2606 OID 16587)
-- Name: projects projects_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- TOC entry 3267 (class 2606 OID 16582)
-- Name: projects projects_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


--
-- TOC entry 3270 (class 2606 OID 16634)
-- Name: tasks tasks_assigned_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES public.users(id);


--
-- TOC entry 3271 (class 2606 OID 16629)
-- Name: tasks tasks_parent_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_parent_task_id_fkey FOREIGN KEY (parent_task_id) REFERENCES public.tasks(id);


--
-- TOC entry 3272 (class 2606 OID 16624)
-- Name: tasks tasks_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- TOC entry 3265 (class 2606 OID 16548)
-- Name: users users_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id);


-- Completed on 2026-10-12 11:45:36

--
-- PostgreSQL database dump complete
--

